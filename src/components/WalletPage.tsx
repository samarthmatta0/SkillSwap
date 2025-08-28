import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  CreditCard,
  Smartphone,
  Banknote,
  TrendingUp,
  Clock,
  Award,
  Target,
  Zap
} from 'lucide-react';

interface WalletPageProps {
  onNavigate: (page: string) => void;
  user?: any;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function WalletPage({ onNavigate }: WalletPageProps) {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);
  const [amount, setAmount] = useState('');

  const balance = 2485;
  const earnings = 1250;
  const spent = 735;

  const transactions = [
    {
      id: 1,
      type: 'earned',
      amount: 50,
      description: 'Teaching React Development',
      partner: 'Sarah Chen',
      date: '2024-01-15',
      time: '2:30 PM',
      status: 'completed'
    },
    {
      id: 2,
      type: 'spent',
      amount: 35,
      description: 'Learning Digital Marketing',
      partner: 'Mike Johnson',
      date: '2024-01-14',
      time: '4:15 PM',
      status: 'completed'
    },
    {
      id: 3,
      type: 'earned',
      amount: 40,
      description: 'Teaching UI/UX Design',
      partner: 'Emma Wilson',
      date: '2024-01-13',
      time: '10:00 AM',
      status: 'completed'
    },
    {
      id: 4,
      type: 'bonus',
      amount: 25,
      description: 'Weekly Learning Streak Bonus',
      date: '2024-01-12',
      time: '12:00 PM',
      status: 'completed'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: '7-Day Learning Streak',
      description: 'Complete 7 days of learning sessions',
      progress: 7,
      total: 7,
      reward: 50,
      completed: true
    },
    {
      id: 2,
      title: 'First 10 Skills Taught',
      description: 'Successfully teach 10 different skills',
      progress: 8,
      total: 10,
      reward: 100,
      completed: false
    },
    {
      id: 3,
      title: 'Top Rated Teacher',
      description: 'Maintain a 4.8+ rating for 30 days',
      progress: 15,
      total: 30,
      reward: 200,
      completed: false
    }
  ];

  const quickAmounts = [50, 100, 250, 500];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated grid background */}
      <div className="grid-background" />

      {/* Header */}
      <header className="glass-nav border-b border-white/20 dark:border-slate-700/50 p-4 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Coins className="w-6 h-6 text-skillswap-accent coin-glow" />
              SkillWallet
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your SkillCoins and earnings
            </p>
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6">
        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Main Balance */}
          <Card className="md:col-span-2 glass-card border-white/20 dark:border-slate-700/50">
            <CardContent className="p-6">
              <div className="text-center">
                <motion.div
                  animate={{ 
                    boxShadow: [
                      '0 0 20px rgba(245, 158, 11, 0.5)',
                      '0 0 40px rgba(245, 158, 11, 0.8)',
                      '0 0 20px rgba(245, 158, 11, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 bg-gradient-to-br from-skillswap-accent to-skillswap-accent-light rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Coins className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-4xl font-bold text-skillswap-accent mb-2">{balance.toLocaleString()}</h2>
                <p className="text-muted-foreground mb-6">Available SkillCoins</p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => setShowTopUp(true)}
                    className="btn-glow bg-gradient-to-r from-skillswap-primary to-skillswap-primary-light hover:from-skillswap-primary-dark hover:to-skillswap-primary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Coins
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowWithdraw(true)}
                    className="glass-card border-white/30 dark:border-slate-600/30"
                  >
                    <Minus className="w-4 h-4 mr-2" />
                    Withdraw
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card className="glass-card border-white/20 dark:border-slate-700/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-skillswap-success/10 rounded-lg flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-skillswap-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Earned</p>
                    <p className="font-bold text-skillswap-success">{earnings.toLocaleString()} coins</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20 dark:border-slate-700/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <ArrowDownRight className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="font-bold text-orange-500">{spent.toLocaleString()} coins</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <Card className="glass-card border-white/20 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-skillswap-primary" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction.type === 'earned' 
                        ? 'bg-skillswap-success/10' 
                        : transaction.type === 'bonus'
                        ? 'bg-purple-500/10'
                        : 'bg-orange-500/10'
                    }`}>
                      {transaction.type === 'earned' ? (
                        <ArrowUpRight className={`w-5 h-5 text-skillswap-success`} />
                      ) : transaction.type === 'bonus' ? (
                        <Zap className="w-5 h-5 text-purple-500" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-orange-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm truncate">{transaction.description}</span>
                        <span className={`font-bold ${
                          transaction.type === 'earned' || transaction.type === 'bonus'
                            ? 'text-skillswap-success' 
                            : 'text-orange-500'
                        }`}>
                          {transaction.type === 'earned' || transaction.type === 'bonus' ? '+' : '-'}{transaction.amount}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {transaction.partner ? `${transaction.partner} • ` : ''}{transaction.date} at {transaction.time}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => {/* View all transactions */}}
              >
                View All Transactions
              </Button>
            </CardContent>
          </Card>

          {/* Achievements & Rewards */}
          <Card className="glass-card border-white/20 dark:border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-skillswap-accent" />
                Achievements & Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border transition-colors ${
                      achievement.completed
                        ? 'bg-skillswap-success/5 border-skillswap-success/20'
                        : 'bg-white/50 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Coins className="w-4 h-4 text-skillswap-accent" />
                          <span className="font-bold text-skillswap-accent">{achievement.reward}</span>
                        </div>
                        {achievement.completed && (
                          <Badge variant="default" className="bg-skillswap-success text-white text-xs mt-1">
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.total}</span>
                      </div>
                      <Progress 
                        value={(achievement.progress / achievement.total) * 100} 
                        className={`h-2 ${achievement.completed ? 'progress-animated' : ''}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => {/* View all achievements */}}
              >
                View All Achievements
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Add Coins Modal */}
        <AnimatePresence>
          {showTopUp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowTopUp(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md glass-modal rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold mb-4">Add SkillCoins</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Amount</label>
                    <Input
                      type="number"
                      placeholder="Enter amount..."
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="glass-card border-white/30 dark:border-slate-600/30"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Quick Amounts</label>
                    <div className="grid grid-cols-2 gap-2">
                      {quickAmounts.map((quickAmount) => (
                        <Button
                          key={quickAmount}
                          variant="outline"
                          onClick={() => setAmount(quickAmount.toString())}
                          className="glass-card border-white/30 dark:border-slate-600/30"
                        >
                          {quickAmount} coins
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Payment Method</label>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-3 glass-card border-white/30 dark:border-slate-600/30"
                      >
                        <CreditCard className="w-4 h-4" />
                        Credit/Debit Card
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-3 glass-card border-white/30 dark:border-slate-600/30"
                      >
                        <Smartphone className="w-4 h-4" />
                        Mobile Payment
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowTopUp(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      // Process payment
                      setShowTopUp(false);
                      setAmount('');
                    }}
                    className="flex-1 btn-glow bg-gradient-to-r from-skillswap-primary to-skillswap-primary-light"
                  >
                    Add Coins
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Withdraw Modal */}
        <AnimatePresence>
          {showWithdraw && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowWithdraw(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md glass-modal rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold mb-4">Withdraw Coins</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Amount</label>
                    <Input
                      type="number"
                      placeholder="Enter amount..."
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="glass-card border-white/30 dark:border-slate-600/30"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Available: {balance.toLocaleString()} coins
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Withdraw Method</label>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-3 glass-card border-white/30 dark:border-slate-600/30"
                      >
                        <Banknote className="w-4 h-4" />
                        Bank Transfer
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-3 glass-card border-white/30 dark:border-slate-600/30"
                      >
                        <Smartphone className="w-4 h-4" />
                        Mobile Wallet
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowWithdraw(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      // Process withdrawal
                      setShowWithdraw(false);
                      setAmount('');
                    }}
                    className="flex-1 btn-glow bg-gradient-to-r from-orange-500 to-orange-600"
                  >
                    Withdraw
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}