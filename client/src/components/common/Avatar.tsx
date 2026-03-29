type AvatarProps = {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-lg',
};

export const Avatar = ({ name, src, size = 'md' }: AvatarProps) => {
  if (src) {
    return <img src={src} alt={name} className={`rounded-full object-cover ${sizeMap[size]}`} loading="lazy" />;
  }

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className={`rounded-full bg-white/10 flex items-center justify-center ${sizeMap[size]}`}>{initials}</div>
  );
};
