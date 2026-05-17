import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, ChevronDown, LoaderCircle, Rocket, ShieldCheck, Sparkles, X } from 'lucide-react';
import { View } from '../App';
import { createBillingOrder, fetchSubscription, verifyBillingPayment, type BillingPlan, type SubscriptionState } from '../lib/billing';
import { getStoredUser } from '../lib/session';
import { cn } from '../lib/utils';

type RazorpayPaymentResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: { name?: string; email?: string };
  theme?: { color?: string };
  handler: (response: RazorpayPaymentResponse) => void;
  modal?: { ondismiss?: () => void };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

interface PricingProps {
  onViewChange: (view: View) => void;
}

const PLANS: Array<{
  id: BillingPlan;
  name: string;
  price: string;
  cadence: string;
  description: string;
  icon: React.ElementType;
  billingInterval: 'monthly' | 'annual';
  features: string[];
}> = [
  {
    id: 'free',
    name: 'Free tier',
    price: '₹0',
    cadence: 'forever',
    description: 'Every authenticated user starts here.',
    icon: Sparkles,
    billingInterval: 'monthly',
    features: ['1 active domain', '20 question-bank questions/day', 'Unlimited practice sessions', '1 GitHub repo scan'],
  },
  {
    id: 'pro',
    name: 'Monthly',
    price: '₹99',
    cadence: 'per month',
    description: 'Short sprint access for serious prep.',
    icon: Rocket,
    billingInterval: 'monthly',
    features: ['All domains unlocked', 'Unlimited question bank', 'Coding rounds', 'Mock interviews', '5 GitHub repo scans'],
  },
  {
    id: 'team',
    name: 'Yearly',
    price: '₹299',
    cadence: 'for 1 year',
    description: 'Placement-season access without extra filters.',
    icon: ShieldCheck,
    billingInterval: 'annual',
    features: ['Everything in Monthly', 'Unlimited GitHub repo scans', 'PDF exports', 'Gap reports', 'Priority support'],
  },
];

const FAQS = [
  {
    question: 'Can I use the free tier after signup?',
    answer: 'Yes. Every authenticated user starts on Free tier automatically until they choose a paid plan.',
  },
  {
    question: 'What is included in Monthly?',
    answer: 'Monthly is for short interview sprints with the full prep workflow, all domains, and higher usage limits.',
  },
  {
    question: 'What is included in Yearly?',
    answer: 'Yearly keeps access active for one full year and is meant for placement season or longer preparation cycles.',
  },
  {
    question: 'Will checkout work before Razorpay keys are added?',
    answer: 'The plans are visible now. Checkout needs Razorpay keys in the environment before real payments can be completed.',
  },
];

function loadRazorpayCheckout() {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise<boolean>((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Pricing({ onViewChange }: PricingProps) {
  const user = getStoredUser();
  const [subscription, setSubscription] = useState<SubscriptionState | null>(null);
  const [processingPlan, setProcessingPlan] = useState<BillingPlan | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<BillingPlan>('pro');
  const [currentPlanModal, setCurrentPlanModal] = useState<BillingPlan | null>(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.loggedIn) return;
    let ignore = false;
    void fetchSubscription().then((result) => {
      if (!ignore && result.ok) setSubscription(result.data);
    });
    return () => {
      ignore = true;
    };
  }, [user?.loggedIn]);

  const startCheckout = async (plan: (typeof PLANS)[number]) => {
    setError(null);
    setMessage(null);
    setSelectedPlan(plan.id);
    if (!user?.loggedIn) {
      onViewChange('signup');
      return;
    }

    if ((subscription?.plan ?? 'free') === plan.id) {
      setCurrentPlanModal(plan.id);
      return;
    }

    setProcessingPlan(plan.id);
    const order = await createBillingOrder({ plan: plan.id, billingInterval: plan.billingInterval, seats: 1 });
    if (order.ok === false) {
      setError(order.error);
      setProcessingPlan(null);
      return;
    }

    if (plan.id === 'free') {
      if ('subscription' in order.data) setSubscription(order.data.subscription);
      setMessage('Free tier is active on your account.');
      setProcessingPlan(null);
      return;
    }

    if (!('orderId' in order.data)) {
      setError('Razorpay order was not returned by the server.');
      setProcessingPlan(null);
      return;
    }

    const loaded = await loadRazorpayCheckout();
    if (!loaded || !window.Razorpay) {
      setError('Razorpay Checkout could not be loaded. Check your network and try again.');
      setProcessingPlan(null);
      return;
    }

    const checkout = new window.Razorpay({
      key: order.data.keyId,
      amount: order.data.amountPaise,
      currency: order.data.currency,
      name: order.data.name,
      description: order.data.description,
      order_id: order.data.orderId,
      prefill: order.data.prefill,
      theme: { color: '#1a1a1a' },
      handler: (payment) => {
        void verifyBillingPayment(payment).then((result) => {
          setProcessingPlan(null);
          if (result.ok === false) {
            setError(result.error);
            return;
          }
          setSubscription(result.data);
          setMessage(`${plan.name} is active. Your account limits are updated.`);
        });
      },
      modal: { ondismiss: () => setProcessingPlan(null) },
    });

    checkout.open();
  };

  const activePlan = subscription?.plan ?? 'free';
  const currentPlan = PLANS.find((plan) => plan.id === currentPlanModal);
  const upgradePlans = PLANS.filter((plan) => plan.id !== 'free' && plan.id !== currentPlanModal);

  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-40" />
      <main className="relative z-10 mx-auto flex w-full max-w-360 flex-col gap-8 px-4 py-10 sm:px-8 lg:px-12">
        <section className="border-b border-blueprint-line pb-8">
          <p className="text-ui-label text-blueprint-muted">Pricing</p>
          <h1 className="mt-3 text-display-xl text-primary">Simple plans.</h1>
          <p className="mt-4 max-w-2xl text-body-lg text-blueprint-muted">
            Free, monthly, or yearly. No extra filters.
          </p>
        </section>

        {(message || error) ? (
          <div className={cn('rounded-xl border px-4 py-3 text-body-md', error ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700')}>
            {error ?? message}
          </div>
        ) : null}

        <section className="grid gap-5 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const Icon = plan.icon;
            const selected = selectedPlan === plan.id;
            const isCurrent = Boolean(user?.loggedIn) && activePlan === plan.id;
            return (
              <article
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={cn(
                  'surface-card group relative flex min-h-[430px] cursor-pointer flex-col transition-all hover:border-primary hover:shadow-[0_18px_42px_rgba(0,0,0,0.12)]',
                  selected && 'border-primary',
                )}
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-blueprint-line bg-[#f5f3f3] text-primary">
                  <Icon size={20} />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-ui-label text-blueprint-muted">{plan.name}</p>
                  {isCurrent ? <span className="rounded-full border border-blueprint-line bg-[#f5f3f3] px-3 py-1 text-ui-label text-primary">Current</span> : null}
                </div>
                <h2 className="mt-3 text-headline-lg text-primary not-italic">
                  {plan.price}
                  <span className="ml-2 text-body-md text-blueprint-muted">{plan.cadence}</span>
                </h2>
                <p className="mt-3 text-body-md text-blueprint-muted">{plan.description}</p>
                <div className="my-6 h-px bg-blueprint-line" />
                <ul className="flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-body-md text-primary">
                      <Check size={17} className="mt-1 shrink-0 text-emerald-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  disabled={processingPlan !== null}
                  onClick={(event) => {
                    event.stopPropagation();
                    void startCheckout(plan);
                  }}
                  className={cn(
                    'mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-ui-label transition-colors disabled:cursor-not-allowed disabled:opacity-60',
                    selected ? 'bg-primary text-white hover:bg-[#303031]' : 'border border-blueprint-line bg-card text-primary hover:bg-[#f5f3f3] group-hover:border-primary',
                  )}
                >
                  {isCurrent ? 'Current plan' : processingPlan === plan.id ? <><LoaderCircle size={15} className="animate-spin" /> Loading...</> : plan.id === 'free' ? 'Use Free' : `Choose ${plan.name}`}
                  {processingPlan !== plan.id ? <ArrowRight size={15} /> : null}
                </button>
              </article>
            );
          })}
        </section>

        <section className="grid gap-8 border-t border-blueprint-line pt-8 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="text-ui-label text-blueprint-muted">Questions</p>
            <h2 className="mt-2 text-headline-lg text-primary">Pricing questions</h2>
          </div>
          <div className="divide-y divide-blueprint-line border-y border-blueprint-line">
            {FAQS.map((faq, index) => {
              const open = openFaq === index;
              return (
                <button key={faq.question} type="button" onClick={() => setOpenFaq(open ? -1 : index)} className="w-full py-5 text-left">
                  <span className="flex items-center justify-between gap-4 text-body-lg font-semibold text-primary">
                    {faq.question}
                    <ChevronDown size={18} className={cn('shrink-0 transition-transform', open && 'rotate-180')} />
                  </span>
                  {open ? <span className="mt-3 block text-body-md text-blueprint-muted">{faq.answer}</span> : null}
                </button>
              );
            })}
          </div>
        </section>
      </main>

      {currentPlan ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-blueprint-line bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-ui-label text-blueprint-muted">Current plan</p>
                <h2 className="mt-2 text-headline-md text-primary not-italic">You are already on {currentPlan.name}.</h2>
              </div>
              <button type="button" aria-label="Close" onClick={() => setCurrentPlanModal(null)} className="text-blueprint-muted hover:text-primary">
                <X size={18} />
              </button>
            </div>
            <p className="mt-3 text-body-md text-blueprint-muted">
              Your account is currently using {currentPlan.price} {currentPlan.cadence}. Choose another plan below if you want to change it.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {upgradePlans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => {
                    setCurrentPlanModal(null);
                    void startCheckout(plan);
                  }}
                  className="rounded-xl border border-blueprint-line bg-[#fbf9f9] p-4 text-left transition-colors hover:border-primary hover:bg-white"
                >
                  <p className="text-ui-label text-blueprint-muted">Upgrade to {plan.name}</p>
                  <p className="mt-2 text-headline-md text-primary not-italic">{plan.price}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
