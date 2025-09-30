-- Create agents table
CREATE TABLE public.agents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  rating NUMERIC(2,1) NOT NULL,
  reliability NUMERIC(3,1) NOT NULL,
  estimated_tokens_ingested INTEGER NOT NULL,
  model_used TEXT NOT NULL,
  model_rate_per_1k_tokens_usd NUMERIC(10,2) NOT NULL,
  human_rate_usd_per_hour INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scenarios table
CREATE TABLE public.scenarios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_name TEXT NOT NULL UNIQUE,
  category_desc TEXT NOT NULL,
  agents TEXT[] NOT NULL,
  success_rate INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create metrics table
CREATE TABLE public.metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_type TEXT NOT NULL UNIQUE,
  base_value NUMERIC(10,2) NOT NULL,
  enhanced_value NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create time_series_data table for resolution time charts
CREATE TABLE public.time_series_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  data_type TEXT NOT NULL,
  date_label TEXT NOT NULL,
  human_value NUMERIC(10,2) NOT NULL,
  ai_value NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (since this is demo data, we'll make it publicly readable)
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_series_data ENABLE ROW LEVEL SECURITY;

-- Create public read policies
CREATE POLICY "Allow public read access to agents" 
ON public.agents FOR SELECT USING (true);

CREATE POLICY "Allow public read access to scenarios" 
ON public.scenarios FOR SELECT USING (true);

CREATE POLICY "Allow public read access to metrics" 
ON public.metrics FOR SELECT USING (true);

CREATE POLICY "Allow public read access to time_series_data" 
ON public.time_series_data FOR SELECT USING (true);

-- Insert agents data
INSERT INTO public.agents (name, rating, reliability, estimated_tokens_ingested, model_used, model_rate_per_1k_tokens_usd, human_rate_usd_per_hour) VALUES
('OrderCancellationAgent', 4.7, 9.0, 745200, 'gpt-4.1', 12.75, 62),
('OrderModificationAgent', 4.5, 8.8, 683100, 'claude-3.5-sonnet', 9.75, 58),
('AddressUpdateAgent', 4.4, 8.7, 352800, 'llama-3.1-large', 3.2, 40),
('RefundsReimbursementsAgent', 4.6, 9.0, 934300, 'gpt-4.1', 14.25, 66),
('BillingInvoicesAgent', 4.5, 8.8, 1230400, 'claude-3.5-sonnet', 12.5, 64),
('PaymentMethodsAgent', 4.3, 8.6, 412500, 'llama-3.1-large', 2.4, 42),
('PaymentIssuesAgent', 4.4, 8.7, 887900, 'claude-3.5-sonnet', 8.25, 60),
('AccountRegistrationAgent', 4.3, 8.5, 321900, 'llama-3.1-large', 1.8, 36),
('DuplicateAccountsAgent', 4.4, 8.6, 268400, 'claude-3.5-sonnet', 10.25, 44),
('AccountClosureAgent', 4.4, 8.7, 389100, 'claude-3.5-sonnet', 13.0, 50),
('PasswordRecoveryAgent', 4.8, 9.1, 241700, 'gpt-4.1', 12.25, 48),
('OrderTrackingAgent', 4.8, 9.1, 1472300, 'gpt-4.1', 13.75, 68),
('ShippingOptionsAgent', 4.3, 8.6, 541800, 'llama-3.1-large', 3.8, 46);

-- Insert scenarios data
INSERT INTO public.scenarios (category_name, category_desc, agents, success_rate) VALUES
('Order cancellation', 'Customer frustrated by repeated transfers between departments when trying to cancel orders. 8-15 min wait times, multiple authentication steps.', ARRAY['OrderCancellationAgent', 'RefundsReimbursementsAgent'], 92),
('Billing & Payment Issues', 'Complex billing inquiries requiring access to multiple systems. Customers face 10+ min holds and inconsistent information about payment methods and invoices.', ARRAY['BillingInvoicesAgent', 'PaymentMethodsAgent', 'PaymentIssuesAgent'], 88),
('Account Management', 'Customers struggle with account updates, password resets, and duplicate accounts. Long resolution times due to security verification processes.', ARRAY['AccountRegistrationAgent', 'DuplicateAccountsAgent', 'AccountClosureAgent', 'PasswordRecoveryAgent'], 95),
('Order Tracking & Delivery', 'High volume of repetitive where is my order calls. Customers transferred between shipping and customer service departments.', ARRAY['OrderTrackingAgent', 'ShippingOptionsAgent'], 94);

-- Insert metrics data
INSERT INTO public.metrics (metric_type, base_value, enhanced_value) VALUES
('repetitive_time', 65, 65),
('escalated_percentage', 40, 40),
('reduced_csat', 28, 28),
('first_call_resolution', 68, 88),
('automation_rate', 45, 92),
('csat_improvement', 72, 84),
('cost_saved_by_agents', 0, 450000),
('immediate_efficiency_gain', 0, 35);

-- Insert time series data
INSERT INTO public.time_series_data (data_type, date_label, human_value, ai_value) VALUES
('resolution', 'July 3', 50, 65),
('resolution', 'July 6', 58, 73),
('resolution', 'July 9', 65, 80),
('resolution', 'July 12', 78, 93),
('resolution', 'July 15', 82, 97),
('resolution', 'July 18', 76, 91),
('resolution', 'July 21', 68, 83),
('resolution', 'July 24', 55, 70),
('roi', 'July 3', 50, 60),
('roi', 'July 6', 62, 72),
('roi', 'July 9', 70, 80),
('roi', 'July 12', 80, 90),
('roi', 'July 15', 85, 95),
('roi', 'July 18', 82, 92),
('roi', 'July 21', 68, 78),
('roi', 'July 24', 55, 65);
