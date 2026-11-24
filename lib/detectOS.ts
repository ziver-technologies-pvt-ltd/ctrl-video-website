export type OS = 'linux' | 'macos' | 'windows' | 'unknown';

export function detectOSFromUA(ua: string): OS {
  const s = (ua || '').toLowerCase();
  if (s.includes('windows') || s.includes('win32') || s.includes('win64')) return 'windows';
  if (s.includes('macintosh') || s.includes('mac os') || s.includes('darwin')) return 'macos';
  if (s.includes('linux') || s.includes('x11') || s.includes('ubuntu') || s.includes('fedora')) return 'linux';
  return 'unknown';
}

interface NavigatorWithUAData extends Navigator {
  userAgentData?: {
    platform?: string;
  };
}

export function detectOSClient(): OS {
  if (typeof window === 'undefined') return 'unknown';
  const nav = navigator as NavigatorWithUAData;
  const ua = (nav.userAgent || '').toLowerCase();
  const platform = (nav.userAgentData?.platform || nav.platform || '').toLowerCase();

  if (platform.startsWith('win') || ua.includes('windows')) return 'windows';
  if (platform.startsWith('mac') || ua.includes('mac os') || ua.includes('macintosh')) return 'macos';
  if (platform.startsWith('linux') || ua.includes('linux') || ua.includes('x11')) return 'linux';
  return 'unknown';
}

export const OS_LABELS: Record<OS, string> = {
  linux: 'Linux',
  macos: 'macOS',
  windows: 'Windows',
  unknown: 'Desktop',
};

export const OS_PRIMARY_EXT: Record<OS, string> = {
  linux: '.rpm',
  macos: '.dmg',
  windows: '.exe',
  unknown: '',
};
