import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, Eye, Lock, Database, Users, Cookie } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (page: string) => void;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

export default function PrivacyPage({ onNavigate }: PrivacyPageProps) {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated grid background */}
      <div className="grid-background" />

      {/* Header */}
      <header className="glass-nav border-b border-white/20 dark:border-slate-700/50 p-4 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('settings')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Settings
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Shield className="w-6 h-6 text-skillswap-primary" />
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: January 1, 2024
            </p>
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card border-white/20 dark:border-slate-700/50 text-center p-4">
                <Eye className="w-8 h-8 text-skillswap-primary mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Data Collection</h3>
                <p className="text-xs text-muted-foreground">Minimal & Transparent</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card border-white/20 dark:border-slate-700/50 text-center p-4">
                <Lock className="w-8 h-8 text-skillswap-accent mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Security</h3>
                <p className="text-xs text-muted-foreground">Bank-level Encryption</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card border-white/20 dark:border-slate-700/50 text-center p-4">
                <Users className="w-8 h-8 text-skillswap-success mx-auto mb-2" />
                <h3 className="font-semibold text-sm">User Rights</h3>
                <p className="text-xs text-muted-foreground">Full Control</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-card border-white/20 dark:border-slate-700/50 text-center p-4">
                <Cookie className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Cookies</h3>
                <p className="text-xs text-muted-foreground">Essential Only</p>
              </Card>
            </motion.div>
          </div>

          {/* Privacy Content */}
          <Card className="glass-card border-white/20 dark:border-slate-700/50">
            <CardContent className="p-8 prose prose-gray dark:prose-invert max-w-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h2>Introduction</h2>
                <p>
                  At SkillSwap, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                  skill exchange platform. Please read this policy carefully to understand our practices.
                </p>

                <h2>Information We Collect</h2>
                <h3>Personal Information</h3>
                <p>We collect information that you provide directly to us, including:</p>
                <ul>
                  <li><strong>Account Information:</strong> Name, email address, phone number, profile photo</li>
                  <li><strong>Profile Data:</strong> Skills, bio, location, availability preferences</li>
                  <li><strong>Payment Information:</strong> Billing address, payment method details (processed securely by third parties)</li>
                  <li><strong>Communication Data:</strong> Messages, session notes, feedback and ratings</li>
                  <li><strong>Identity Verification:</strong> Government-issued ID or other verification documents (when required)</li>
                </ul>

                <h3>Automatically Collected Information</h3>
                <p>When you use SkillSwap, we automatically collect certain information:</p>
                <ul>
                  <li><strong>Usage Data:</strong> Session duration, features used, interaction patterns</li>
                  <li><strong>Device Information:</strong> IP address, browser type, device identifiers, operating system</li>
                  <li><strong>Location Data:</strong> General location (city/state) for matching purposes</li>
                  <li><strong>Performance Data:</strong> App crashes, performance metrics, error logs</li>
                </ul>

                <h3>Session Data</h3>
                <p>During skill exchange sessions, we may collect:</p>
                <ul>
                  <li><strong>Session Metadata:</strong> Start time, duration, participants, session type</li>
                  <li><strong>Quality Metrics:</strong> Connection quality, technical issues</li>
                  <li><strong>Safety Data:</strong> Reports, flags, or safety-related incidents</li>
                  <li><strong>Recording Data:</strong> Session recordings (only with explicit consent from all participants)</li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>We use the collected information for the following purposes:</p>

                <h3>Core Platform Functions</h3>
                <ul>
                  <li>Creating and managing user accounts</li>
                  <li>Facilitating skill exchange sessions and connections</li>
                  <li>Processing payments and managing SkillCoins</li>
                  <li>Providing customer support and technical assistance</li>
                  <li>Maintaining platform security and preventing fraud</li>
                </ul>

                <h3>Matching and Recommendations</h3>
                <ul>
                  <li>Connecting users with compatible skills and interests</li>
                  <li>Suggesting relevant skills and learning opportunities</li>
                  <li>Personalizing the user experience</li>
                  <li>Improving matching algorithms</li>
                </ul>

                <h3>Communication and Updates</h3>
                <ul>
                  <li>Sending session reminders and notifications</li>
                  <li>Providing platform updates and new features</li>
                  <li>Sharing educational content and tips</li>
                  <li>Conducting surveys and gathering feedback</li>
                </ul>

                <h3>Analytics and Improvement</h3>
                <ul>
                  <li>Analyzing platform usage patterns</li>
                  <li>Identifying and fixing technical issues</li>
                  <li>Developing new features and improvements</li>
                  <li>Conducting research on learning effectiveness</li>
                </ul>

                <h2>Information Sharing and Disclosure</h2>
                <p>We do not sell your personal information. We may share your information in the following circumstances:</p>

                <h3>With Other Users</h3>
                <ul>
                  <li>Profile information visible to potential skill exchange partners</li>
                  <li>Skills, ratings, and reviews (as chosen by privacy settings)</li>
                  <li>Session-related communications and scheduling information</li>
                  <li>Publicly displayed achievements and badges (with consent)</li>
                </ul>

                <h3>With Service Providers</h3>
                <ul>
                  <li>Payment processors for transaction handling</li>
                  <li>Cloud storage providers for data hosting</li>
                  <li>Analytics services for platform improvement</li>
                  <li>Customer support tools and communication platforms</li>
                </ul>

                <h3>For Legal Compliance</h3>
                <ul>
                  <li>Responding to legal requests and court orders</li>
                  <li>Investigating and preventing fraud or illegal activities</li>
                  <li>Protecting the safety and security of users</li>
                  <li>Enforcing our Terms of Service</li>
                </ul>

                <h3>Business Transfers</h3>
                <ul>
                  <li>In connection with mergers, acquisitions, or asset sales</li>
                  <li>During business restructuring or ownership changes</li>
                  <li>As part of bankruptcy or similar proceedings</li>
                </ul>

                <h2>Data Security</h2>
                <p>We implement comprehensive security measures to protect your information:</p>

                <h3>Technical Safeguards</h3>
                <ul>
                  <li><strong>Encryption:</strong> All data transmitted and stored using industry-standard encryption</li>
                  <li><strong>Access Controls:</strong> Strict employee access controls and authentication requirements</li>
                  <li><strong>Network Security:</strong> Firewalls, intrusion detection, and monitoring systems</li>
                  <li><strong>Regular Updates:</strong> Security patches and system updates applied promptly</li>
                </ul>

                <h3>Organizational Measures</h3>
                <ul>
                  <li><strong>Employee Training:</strong> Regular security awareness and privacy training</li>
                  <li><strong>Background Checks:</strong> Comprehensive screening for employees with data access</li>
                  <li><strong>Incident Response:</strong> Established procedures for security incident handling</li>
                  <li><strong>Third-Party Audits:</strong> Regular security assessments by external experts</li>
                </ul>

                <h2>Your Privacy Rights</h2>
                <p>You have the following rights regarding your personal information:</p>

                <h3>Access and Portability</h3>
                <ul>
                  <li>Request copies of your personal information</li>
                  <li>Download your data in a portable format</li>
                  <li>View your data processing activities</li>
                </ul>

                <h3>Correction and Updates</h3>
                <ul>
                  <li>Update your profile and account information</li>
                  <li>Correct inaccurate or incomplete data</li>
                  <li>Modify your privacy settings and preferences</li>
                </ul>

                <h3>Deletion and Restriction</h3>
                <ul>
                  <li>Delete your account and associated data</li>
                  <li>Request removal of specific information</li>
                  <li>Restrict certain data processing activities</li>
                </ul>

                <h3>Objection and Withdrawal</h3>
                <ul>
                  <li>Object to certain uses of your data</li>
                  <li>Withdraw consent for optional data processing</li>
                  <li>Opt out of marketing communications</li>
                </ul>

                <h2>Cookies and Tracking</h2>
                <p>We use cookies and similar technologies to enhance your experience:</p>

                <h3>Essential Cookies</h3>
                <ul>
                  <li>Authentication and session management</li>
                  <li>Security and fraud prevention</li>
                  <li>Basic platform functionality</li>
                </ul>

                <h3>Analytics Cookies</h3>
                <ul>
                  <li>Usage statistics and performance metrics</li>
                  <li>Feature effectiveness measurement</li>
                  <li>User behavior analysis (aggregated and anonymized)</li>
                </ul>

                <h3>Preference Cookies</h3>
                <ul>
                  <li>Language and region settings</li>
                  <li>Interface customization</li>
                  <li>Accessibility preferences</li>
                </ul>

                <p>You can control cookie settings through your browser preferences or our cookie management tool.</p>

                <h2>International Data Transfers</h2>
                <p>
                  SkillSwap operates globally, and your information may be transferred to and processed in countries other than 
                  your residence. We ensure appropriate safeguards are in place for international transfers, including:
                </p>
                <ul>
                  <li>Standard contractual clauses approved by regulatory authorities</li>
                  <li>Adequacy decisions for countries with equivalent protection levels</li>
                  <li>Certification programs and codes of conduct</li>
                  <li>Explicit user consent where required</li>
                </ul>

                <h2>Children's Privacy</h2>
                <p>
                  SkillSwap is intended for users aged 18 and above. We do not knowingly collect personal information from 
                  children under 18. If we become aware that we have collected information from a child under 18, we will 
                  delete it promptly. Parents or guardians who believe their child has provided information to us should 
                  contact us immediately.
                </p>

                <h2>Data Retention</h2>
                <p>We retain your information for different periods depending on the type of data and purpose:</p>

                <h3>Account Information</h3>
                <ul>
                  <li>Retained while your account is active</li>
                  <li>Deleted within 30 days of account closure (unless legal requirements apply)</li>
                  <li>Some information may be retained for fraud prevention</li>
                </ul>

                <h3>Session Data</h3>
                <ul>
                  <li>Session recordings: 30 days (unless reported for safety reasons)</li>
                  <li>Metadata: 2 years for analytics and improvement</li>
                  <li>Safety reports: 5 years or as required by law</li>
                </ul>

                <h3>Financial Data</h3>
                <ul>
                  <li>Transaction records: 7 years for tax and legal compliance</li>
                  <li>Payment information: Processed by third parties, not stored by us</li>
                  <li>SkillCoins history: Retained for account lifecycle</li>
                </ul>

                <h2>Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy periodically to reflect changes in our practices or for legal, 
                  operational, or regulatory reasons. We will notify you of material changes through:
                </p>
                <ul>
                  <li>Email notifications to your registered address</li>
                  <li>Prominent notices on the platform</li>
                  <li>Push notifications (if enabled)</li>
                  <li>Updates to this page with revision dates</li>
                </ul>

                <h2>Contact Us</h2>
                <p>
                  If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, 
                  please contact us through:
                </p>

                <div className="bg-muted/50 rounded-lg p-4 not-prose">
                  <h4 className="font-semibold mb-2">Privacy Team</h4>
                  <ul className="space-y-1 text-sm">
                    <li><strong>Email:</strong> privacy@skillswap.com</li>
                    <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                    <li><strong>Mail:</strong> 123 Learning Street, Knowledge City, KC 12345</li>
                    <li><strong>Response Time:</strong> We respond to privacy inquiries within 48 hours</li>
                  </ul>
                </div>

                <h3>Data Protection Officer</h3>
                <p>
                  For users in the European Union or other regions with data protection regulations, 
                  you can contact our Data Protection Officer at: dpo@skillswap.com
                </p>

                <hr className="my-8" />

                <div className="text-center text-sm text-muted-foreground not-prose">
                  <p>
                    This Privacy Policy was last updated on January 1, 2024. 
                    By using SkillSwap, you acknowledge that you have read and understand this policy.
                  </p>
                </div>
              </motion.div>
            </CardContent>
          </Card>

          {/* Sticky Back Button */}
          <div className="sticky bottom-6 flex justify-center mt-8">
            <Button
              onClick={() => onNavigate('settings')}
              className="btn-glow bg-gradient-to-r from-skillswap-primary to-skillswap-primary-light shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}