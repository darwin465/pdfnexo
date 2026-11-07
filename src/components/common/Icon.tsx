import {
  Combine, Minimize2, Scissors, ImagePlus, FileImage, RotateCw, FileOutput, Droplets, LayoutGrid, Lock,
  Gift, MousePointerClick, UserX, ShieldCheck, Smartphone, Search, ChevronRight, Menu,
  type LucideProps,
} from 'lucide-react';

const icons = {
  combine: Combine, minimize: Minimize2, scissors: Scissors, 'image-plus': ImagePlus, 'file-image': FileImage,
  rotate: RotateCw, 'file-output': FileOutput, droplets: Droplets, 'layout-grid': LayoutGrid, lock: Lock,
  gift: Gift, pointer: MousePointerClick, 'user-x': UserX, shield: ShieldCheck, smartphone: Smartphone,
  search: Search, chevron: ChevronRight, menu: Menu,
} as const;

export type IconName = keyof typeof icons;

export default function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" {...props} />;
}
