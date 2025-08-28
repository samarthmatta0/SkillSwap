export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const getProgressColor = (remainingTime: number): string => {
  if (remainingTime <= 120) return 'bg-red-500'; // 2 minutes
  if (remainingTime <= 300) return 'bg-yellow-500'; // 5 minutes
  return 'bg-primary';
};

export const getColorClass = (color: 'primary' | 'success' | 'warning' | 'danger'): string => {
  if (color === 'success') return 'text-green-600';
  if (color === 'warning') return 'text-yellow-600';
  if (color === 'danger') return 'text-red-600';
  return 'text-primary';
};