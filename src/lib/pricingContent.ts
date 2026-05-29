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
    description: 'Start free with real question-bank access and enough rounds to build momentum.',
    billingInterval: 'monthly',
    features: ['All domains unlocked', 'All question banks and questions', 'Unlimited practice sessions', '3 coding rounds per month', '3 scenario rounds per month', '3 mock interviews per month', '3 GitHub repo scans'],
  },
  {
    id: 'pro',
    name: 'Monthly',
    price: '₹99',
    cadence: 'per 3 months',
    description: 'Quarterly sprint access for serious prep with higher limits and every round unlocked.',
    billingInterval: 'monthly',
    features: ['Everything in Free', 'Unlimited coding rounds', 'Unlimited scenario rounds', 'Unlimited mock interviews', '15 GitHub repo scans per month'],
    featured: true,
  },
  {
    id: 'team',
    name: 'Yearly',
    price: '₹299',
    cadence: 'for 1 year',
    description: 'Placement-season access with unlimited repo scanning and exports.',
    billingInterval: 'annual',
    features: ['Everything in Monthly', 'Unlimited GitHub repo scans', 'PDF exports', 'Priority support', 'Placement-season access'],
  },
];

export const PRICING_FAQS = [
  {
    question: 'What is included in the Free tier?',
    answer: 'Free includes all domains, the full question bank, unlimited practice sessions, 3 coding rounds, 3 scenario rounds, 3 mock interviews, and 3 GitHub repo scans so you can test the complete prep loop before upgrading.',
  },
  {
    question: 'Can I upgrade or downgrade whenever I want?',
    answer: 'Yes. You can move from Free to Monthly or Yearly whenever you are ready. If you switch plans later, your saved sessions, repo scans, practice history, and readiness progress stay with your account so your prep work is not lost.',
  },
  {
    question: 'What is the difference between Monthly and Yearly for repo scans and PDF exports?',
    answer: 'Monthly gives you 15 GitHub repo scans each month for a focused prep sprint. Yearly unlocks unlimited GitHub repo scans and PDF exports, so it is better if you plan to revise many projects, keep downloadable notes, or prepare across a full placement season.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'If a payment succeeds but your plan is not activated, or you were charged by mistake, contact support with your account email and Razorpay payment ID. Refunds are reviewed case by case, and eligible refunds are processed back through Razorpay according to the payment provider timeline.',
  },
];
