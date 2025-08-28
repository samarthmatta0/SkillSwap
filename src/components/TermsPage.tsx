import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { motion } from 'motion/react';
import { ArrowLeft, FileText, Calendar, Shield, Users } from 'lucide-react';

interface TermsPageProps {
  onNavigate: (page: string) => void;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

export default function TermsPage({ onNavigate }: TermsPageProps) {
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
              <FileText className="w-6 h-6 text-skillswap-primary" />
              Terms & Conditions
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card border-white/20 dark:border-slate-700/50 text-center p-4">
                <Calendar className="w-8 h-8 text-skillswap-primary mx-auto mb-2" />
                <h3 className="font-semibold">Effective Date</h3>
                <p className="text-sm text-muted-foreground">January 1, 2024</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card border-white/20 dark:border-slate-700/50 text-center p-4">
                <Shield className="w-8 h-8 text-skillswap-accent mx-auto mb-2" />
                <h3 className="font-semibold">Legal Protection</h3>
                <p className="text-sm text-muted-foreground">Both parties protected</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card border-white/20 dark:border-slate-700/50 text-center p-4">
                <Users className="w-8 h-8 text-skillswap-success mx-auto mb-2" />
                <h3 className="font-semibold">Fair Platform</h3>
                <p className="text-sm text-muted-foreground">Equal opportunities</p>
              </Card>
            </motion.div>
          </div>

          {/* Terms Content */}
          <Card className="glass-card border-white/20 dark:border-slate-700/50">
            <CardContent className="p-8 prose prose-gray dark:prose-invert max-w-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using SkillSwap, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>

                <h2>2. Description of Service</h2>
                <p>
                  SkillSwap is a platform that connects individuals for the purpose of skill exchange. Users can offer to teach 
                  skills they possess in exchange for learning new skills from other users. The platform facilitates these 
                  connections but does not guarantee the quality or outcome of any skill exchange session.
                </p>

                <h2>3. User Accounts and Registration</h2>
                <h3>3.1 Account Creation</h3>
                <ul>
                  <li>Users must provide accurate and complete information when creating an account</li>
                  <li>Users are responsible for maintaining the confidentiality of their account credentials</li>
                  <li>Users must be at least 18 years old to create an account</li>
                  <li>One account per person is allowed</li>
                </ul>

                <h3>3.2 Account Verification</h3>
                <ul>
                  <li>SkillSwap reserves the right to verify user identities</li>
                  <li>Users may be required to provide additional documentation for verification</li>
                  <li>Unverified accounts may have limited functionality</li>
                </ul>

                <h2>4. Platform Usage</h2>
                <h3>4.1 Acceptable Use</h3>
                <p>Users agree to use SkillSwap only for lawful purposes and in accordance with these terms. Prohibited activities include:</p>
                <ul>
                  <li>Harassment, abuse, or discrimination of other users</li>
                  <li>Sharing inappropriate, offensive, or illegal content</li>
                  <li>Attempting to circumvent platform fees or payment systems</li>
                  <li>Using automated systems to access the platform</li>
                  <li>Impersonating other individuals or organizations</li>
                </ul>

                <h3>4.2 Content Guidelines</h3>
                <ul>
                  <li>Users are responsible for all content they share on the platform</li>
                  <li>Content must be original or properly licensed</li>
                  <li>SkillSwap reserves the right to remove content that violates these terms</li>
                  <li>Users retain ownership of their original content but grant SkillSwap a license to use it</li>
                </ul>

                <h2>5. Skill Exchange Sessions</h2>
                <h3>5.1 Fair Time System</h3>
                <ul>
                  <li>Sessions are designed to provide equal learning and teaching time for both participants</li>
                  <li>Built-in timers ensure fair distribution of speaking time</li>
                  <li>Users are expected to honor the fair time principles</li>
                </ul>

                <h3>5.2 Session Conduct</h3>
                <ul>
                  <li>Users must attend scheduled sessions or provide reasonable notice of cancellation</li>
                  <li>Professional and respectful behavior is required during all sessions</li>
                  <li>Sessions may be recorded for quality and safety purposes (with consent)</li>
                  <li>Users may report inappropriate behavior during sessions</li>
                </ul>

                <h2>6. Payment and Fees</h2>
                <h3>6.1 SkillCoins System</h3>
                <ul>
                  <li>SkillCoins are the virtual currency used within the platform</li>
                  <li>Users can earn SkillCoins by teaching and spend them to learn</li>
                  <li>SkillCoins can be purchased with real money or withdrawn (subject to fees)</li>
                  <li>SkillCoins have no cash value outside the platform</li>
                </ul>

                <h3>6.2 Subscription Plans</h3>
                <ul>
                  <li>Different subscription tiers offer varying daily limits and features</li>
                  <li>Subscriptions auto-renew unless cancelled before the renewal date</li>
                  <li>Refunds are provided according to our refund policy</li>
                  <li>SkillSwap reserves the right to modify subscription pricing with notice</li>
                </ul>

                <h2>7. Privacy and Data Protection</h2>
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, 
                  to understand our practices regarding the collection and use of your personal information.
                </p>

                <h2>8. Intellectual Property</h2>
                <h3>8.1 Platform Content</h3>
                <ul>
                  <li>SkillSwap owns all rights to the platform software, design, and trademarks</li>
                  <li>Users may not copy, modify, or distribute platform content without permission</li>
                  <li>The SkillSwap name and logo are protected trademarks</li>
                </ul>

                <h3>8.2 User Content</h3>
                <ul>
                  <li>Users retain ownership of content they create and share</li>
                  <li>Users grant SkillSwap a license to use, display, and distribute user content</li>
                  <li>Users must ensure they have rights to any content they share</li>
                </ul>

                <h2>9. Limitation of Liability</h2>
                <p>
                  SkillSwap provides the platform "as is" without warranties of any kind. We are not liable for any damages 
                  arising from your use of the service, including but not limited to direct, indirect, incidental, punitive, 
                  and consequential damages. Our total liability is limited to the amount you paid for the service in the 
                  12 months preceding the claim.
                </p>

                <h2>10. Termination</h2>
                <h3>10.1 Termination by User</h3>
                <ul>
                  <li>Users may terminate their account at any time through account settings</li>
                  <li>Unused SkillCoins may be withdrawn subject to our withdrawal policy</li>
                  <li>Subscription cancellations take effect at the end of the current billing period</li>
                </ul>

                <h3>10.2 Termination by SkillSwap</h3>
                <ul>
                  <li>We may suspend or terminate accounts that violate these terms</li>
                  <li>We may terminate the service with reasonable notice to users</li>
                  <li>Upon termination, users lose access to their account and SkillCoins</li>
                </ul>

                <h2>11. Changes to Terms</h2>
                <p>
                  SkillSwap reserves the right to modify these terms at any time. Users will be notified of material changes 
                  via email or platform notification. Continued use of the service after changes constitutes acceptance of 
                  the new terms.
                </p>

                <h2>12. Governing Law and Disputes</h2>
                <p>
                  These terms are governed by the laws of [Jurisdiction]. Any disputes will be resolved through binding 
                  arbitration in [Location]. Users waive their right to participate in class-action lawsuits.
                </p>

                <h2>13. Contact Information</h2>
                <p>
                  If you have questions about these Terms & Conditions, please contact us at:
                </p>
                <ul>
                  <li>Email: legal@skillswap.com</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Address: 123 Learning Street, Knowledge City, KC 12345</li>
                </ul>

                <hr className="my-8" />

                <div className="text-center text-sm text-muted-foreground">
                  <p>
                    These terms were last updated on January 1, 2024. 
                    By using SkillSwap, you acknowledge that you have read, understood, and agree to these terms.
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