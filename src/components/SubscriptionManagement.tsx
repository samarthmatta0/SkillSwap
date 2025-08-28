import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { Footer } from './ui/footer';
import { 
  ArrowLeft, 
  Check, 
  Crown, 
  Zap, 
  Users, 
  Clock, 
  Calendar,
  CreditCard,
  Download,
  Star,
  Shield,
  AlertTriangle,
  CheckCircle,
  Plus
} from 'lucide-react';

interface SubscriptionManagementProps {
  onNavigate: (page: string) => void;
}

const SubscriptionManagement: React.FC<SubscriptionManagementProps> = ({ onNavigate }) => {
  const currentPlan = {
    name: "Standard Plan",
    price: "$19.99",
    billing: "monthly",
    nextBilling: "Dec 15, 2024"
  };

  const usage = {
    requests: { used: 8, total: 25 },
    connections: { used: 12, total: 25 },
    sessionMinutes: 60,
    boosters: { used: 2, total: 15 }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => onNavigate('dashboard')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-semibold">Subscription & Billing</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Current Plan */}
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{currentPlan.name}</h3>
                <p className="text-muted-foreground">{currentPlan.price} per {currentPlan.billing}</p>
                <p className="text-sm text-muted-foreground">Next billing: {currentPlan.nextBilling}</p>
              </div>
              <Badge className="skillswap-gradient text-white">Active</Badge>
            </div>
            <div className="flex gap-4">
              <Button variant="outline">Change Plan</Button>
              <Button variant="outline">Cancel Subscription</Button>
            </div>
          </CardContent>
        </Card>

        {/* Usage Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Current Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Daily Requests</span>
                  <span className="text-sm text-muted-foreground">
                    {usage.requests.used}/{usage.requests.total}
                  </span>
                </div>
                <Progress value={(usage.requests.used / usage.requests.total) * 100} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Daily Connections</span>
                  <span className="text-sm text-muted-foreground">
                    {usage.connections.used}/{usage.connections.total}
                  </span>
                </div>
                <Progress value={(usage.connections.used / usage.connections.total) * 100} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Session Length</span>
                  <span className="text-sm text-muted-foreground">{usage.sessionMinutes} min max</span>
                </div>
                <Progress value={100} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Boosters Available</span>
                  <span className="text-sm text-muted-foreground">
                    {usage.boosters.total - usage.boosters.used} remaining
                  </span>
                </div>
                <Progress value={((usage.boosters.total - usage.boosters.used) / usage.boosters.total) * 100} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <h3 className="font-semibold mb-2">Buy Boosters</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Extend session time or get extra connections
              </p>
              <Button size="sm" className="skillswap-gradient text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Boosters
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <h3 className="font-semibold mb-2">Payment Methods</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Manage your payment information
              </p>
              <Button size="sm" variant="outline">
                Manage Payment
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Download className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <h3 className="font-semibold mb-2">Billing History</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Download invoices and receipts
              </p>
              <Button size="sm" variant="outline">
                View History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default SubscriptionManagement;