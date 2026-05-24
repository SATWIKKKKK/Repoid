import type { BillingPlan } from './billing';

export type PricingPlanContent = {
  id: BillingPlan;
  name: string;
  price: string;
  cadence: string;
  description: string;
  billingInterval: 'monthly' | 'annual';
  features: string[];
  featured?: boolean;
};

export const PRICING_PLANS: PricingPlanContent[] = [
  {
    id: 'free',
    name: 'Free tier',
    price: '₹0',
    cadence: 'forever',
    description: 'Start free, explore the platform, and build prep momentum before you pay.',
    billingInterval: 'monthly',
    features: ['1 active domain', '20 question-bank questions/day', 'Unlimited practice sessions', '3 GitHub repo scans'],
  },
  {
    id: 'pro',
    name: 'Monthly',
    price: '₹99',
    cadence: 'per 3 months',
    description: 'Quarterly sprint access for serious prep with every round unlocked.',
    billingInterval: 'monthly',
    features: ['All domains unlocked', 'Unlimited question bank', 'Access to all rounds — 15 questions each', 'Mock interviews', '7 GitHub repo scans per month'],
    featured: true,
  },
  {
    id: 'team',
    name: 'Yearly',
    price: '₹299',
    cadence: 'for 1 year',
    description: 'Placement-season access with unlimited repo scanning and exports.',
    billingInterval: 'annual',
    features: ['Everything in Monthly', 'Access to all rounds', 'Unlimited GitHub repo scans', 'PDF exports', 'Priority support'],
  },
];

export const PRICING_FAQS = [
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
    answer: 'Monthly gives you 7 GitHub repo scans each month for a focused prep sprint. Yearly unlocks unlimited GitHub repo scans and PDF exports, so it is better if you plan to revise many projects, keep downloadable notes, or prepare across a full placement season.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'If a payment succeeds but your plan is not activated, or you were charged by mistake, contact support with your account email and Razorpay payment ID. Refunds are reviewed case by case, and eligible refunds are processed back through Razorpay according to the payment provider timeline.',
  },
];