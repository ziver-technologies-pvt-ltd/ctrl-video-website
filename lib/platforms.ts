import { OS } from './detectOS';
import { ReleaseData } from './github';

export interface PlatformConfig {
  id: OS;
  label: string;
  architecture: string;
  formatBadge: string;
  installCommand: string;
  verifyCommand: (file: string) => string;
  getPrimaryAsset: (r: ReleaseData) => { url: string; name: string; size: number; digest?: string };
  getSecondaryAsset?: (r: ReleaseData) => { url: string; name: string; size: number; digest?: string } | undefined;
}

export const PLATFORMS: PlatformConfig[] = [
  {
    id: 'linux',
    label: 'Linux',
    architecture: 'x86_64',
    formatBadge: 'RPM & Tarball',
    installCommand: `# Install RPM (Fedora / RHEL / openSUSE)
sudo rpm -i ctrl_video-linux-x86_64.rpm

# Or extract Tarball directly
tar -xzf ctrl_video-linux-x64.tar.gz
cd ctrl_video && ./ctrl_video`,
    verifyCommand: (f) => `sha256sum ${f}`,
    getPrimaryAsset: (r) => ({
      url: r.linux.primaryUrl,
      name: r.linux.primary?.name || 'ctrl_video-linux-x86_64.rpm',
      size: r.linux.primary?.size || 12685969,
      digest: r.linux.primary?.digest,
    }),
    getSecondaryAsset: (r) =>
      r.linux.secondary
        ? {
            url: r.linux.secondary.url,
            name: r.linux.secondary.name,
            size: r.linux.secondary.size,
            digest: r.linux.secondary.digest,
          }
        : undefined,
  },
  {
    id: 'macos',
    label: 'macOS',
    architecture: 'Universal (Apple Silicon & Intel)',
    formatBadge: 'Universal DMG & Tarball',
    installCommand: `# Open and drag into Applications
open ctrl_video-macos-universal.dmg

# Or extract Tarball
tar -xzf ctrl_video-macos.tar.gz`,
    verifyCommand: (f) => `shasum -a 256 ${f}`,
    getPrimaryAsset: (r) => ({
      url: r.macos.primaryUrl,
      name: r.macos.primary?.name || 'ctrl_video-macos-universal.dmg',
      size: r.macos.primary?.size || 39360624,
      digest: r.macos.primary?.digest,
    }),
    getSecondaryAsset: (r) =>
      r.macos.secondary
        ? {
            url: r.macos.secondary.url,
            name: r.macos.secondary.name,
            size: r.macos.secondary.size,
            digest: r.macos.secondary.digest,
          }
        : undefined,
  },
  {
    id: 'windows',
    label: 'Windows',
    architecture: 'x64 (Windows 10 / 11)',
    formatBadge: 'Setup Installer & Portable Zip',
    installCommand: `# Run installer (Desktop shortcut and uninstall registry created)
ctrl_video-windows-setup-x64.exe

# Or extract portable ZIP archive`,
    verifyCommand: (f) => `certutil -hashfile ${f} SHA256`,
    getPrimaryAsset: (r) => ({
      url: r.windows.primaryUrl,
      name: r.windows.primary?.name || 'ctrl_video-windows-setup-x64.exe',
      size: r.windows.primary?.size || 25445130,
      digest: r.windows.primary?.digest,
    }),
    getSecondaryAsset: (r) =>
      r.windows.secondary
        ? {
            url: r.windows.secondary.url,
            name: r.windows.secondary.name,
            size: r.windows.secondary.size,
            digest: r.windows.secondary.digest,
          }
        : undefined,
  },
];
