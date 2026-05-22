import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, ChevronDown, LoaderCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  billingInterval: 'monthly' | 'annual';
  features: string[];
}> = [
  {
    id: 'free',
    name: 'Free tier',
    price: '₹0',
    cadence: 'forever',
    description: 'Every authenticated user starts here.',
    billingInterval: 'monthly',
    features: ['1 active domain', '20 question-bank questions/day', 'Unlimited practice sessions', '3 GitHub repo scans'],
  },
  {
    id: 'pro',
    name: 'Monthly',
    price: '₹1',
    cadence: 'per 3 months',
    description: 'Quarterly sprint access for serious prep.',
    billingInterval: 'monthly',
    features: ['All domains unlocked', 'Unlimited question bank', 'Access to all rounds — 15 questions each', 'Mock interviews', '7 GitHub repo scans per month'],
  },
  {
    id: 'team',
    name: 'Yearly',
    price: '₹299',
    cadence: 'for 1 year',
    description: 'Placement-season access without extra filters.',
    billingInterval: 'annual',
    features: ['Everything in Monthly', 'Access to all rounds', 'Unlimited GitHub repo scans', 'PDF exports', 'Priority support'],
  },
];

const FAQS = [
  {
    question: 'What happens when I use all 20 free daily questions?',
    answer: 'Your Free tier stays active forever, but the question bank pauses for the rest of that day after 20 questions. You can come back the next day when your daily limit refreshes, or upgrade if you want unlimited question-bank practice without waiting.',
  },
  {
    question: 'Can I upgrade or downgrade whenever I want?',
    answer: 'Yes. You can move from Free to Monthly or Yearly whenever you are ready. If you switch plans later, your saved sessions, repo scans, practice history, and readiness progress stay with your account so your prep work is not lost.',
  },
  {
    question: 'What is the difference between Monthly and Yearly for repo scans and PDF exports?',
    answer: 'Monthly gives you 5 GitHub repo scans for a 3-month prep sprint, which is useful if you want to analyze a few portfolio projects. Yearly unlocks unlimited GitHub repo scans and PDF exports, so it is better if you plan to revise many projects, keep downloadable notes, or prepare across a full placement season.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'If a payment succeeds but your plan is not activated, or you were charged by mistake, contact support with your account email and Razorpay payment ID. Refunds are reviewed case by case, and eligible refunds are processed back through Razorpay according to the payment provider timeline.',
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
  const navigate = useNavigate();
  const user = getStoredUser();
  const [subscription, setSubscription] = useState<SubscriptionState | null>(null);
  const [processingPlan, setProcessingPlan] = useState<BillingPlan | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<BillingPlan>('pro');
  const [currentPlanModal, setCurrentPlanModal] = useState<BillingPlan | null>(null);
  const [openFaq, setOpenFaq] = useState(-1);
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
          navigate(`/dashboard?payment=success&plan=${encodeURIComponent(plan.name)}&expiry=${encodeURIComponent(result.data.currentPeriodEnd ?? '')}`, { replace: true });
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
          <h1 className="mt-3 page-title">Simple plans.</h1>
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
                <div className="flex items-center justify-between gap-3">
                  <p className="text-ui-label text-blueprint-muted">{plan.name}</p>
                  {isCurrent ? <span className="rounded-full border border-emerald-500/40 bg-emerald-50 px-3 py-1 text-ui-label text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">Current</span> : null}
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
                {isCurrent && subscription?.currentPeriodEnd ? (
                  <p className={cn('mt-5 rounded-xl border px-3 py-2 text-body-sm', subscription.status === 'expired' ? 'border-red-300/40 bg-red-500/10 text-red-600 dark:text-red-300' : 'border-emerald-300/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300')}>
                    {subscription.status === 'expired' ? 'Expired on' : 'Active until'} {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                ) : null}
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
