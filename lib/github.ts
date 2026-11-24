import 'server-only';

export interface ReleaseAsset {
  name: string;
  url: string;
  size: number;
  digest?: string;
  downloadCount: number;
  contentType: string;
}

export interface PlatformAssetGroup {
  primaryUrl: string;
  fallbackUrl: string;
  primary?: ReleaseAsset;
  secondary?: ReleaseAsset;
}

export interface ReleaseData {
  version: string;
  name: string;
  publishedAt: string;
  releasePageUrl: string;
  linux: PlatformAssetGroup;
  macos: PlatformAssetGroup;
  windows: PlatformAssetGroup;
}

interface RawAsset {
  name: string;
  browser_download_url?: string;
  url?: string;
  size?: number;
  digest?: string;
  download_count?: number;
  downloadCount?: number;
  content_type?: string;
  contentType?: string;
}

interface RawRelease {
  tag_name?: string;
  name?: string;
  published_at?: string;
  html_url?: string;
  assets?: RawAsset[];
}

const GH_OWNER = process.env.GH_OWNER || 'ziver-technologies-pvt-ltd';
const GH_REPO = process.env.GH_REPO || 'ctrl-video';
const GH_TOKEN = process.env.GH_TOKEN;

const BASE_API = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}`;
const DL_BASE = `https://github.com/${GH_OWNER}/${GH_REPO}/releases/latest/download`;

export const FALLBACK_URLS = {
  linux: `${DL_BASE}/ctrl_video-linux-x86_64.rpm`,
  linuxTar: `${DL_BASE}/ctrl_video-linux-x64.tar.gz`,
  macos: `${DL_BASE}/ctrl_video-macos-universal.dmg`,
  macosTar: `${DL_BASE}/ctrl_video-macos.tar.gz`,
  windows: `${DL_BASE}/ctrl_video-windows-setup-x64.exe`,
  windowsZip: `${DL_BASE}/ctrl_video-windows-x64.zip`,
};

function findAsset(assets: RawAsset[], patterns: RegExp[]): ReleaseAsset | undefined {
  const raw = assets.find((a) => patterns.some((p) => p.test(a.name)));
  if (!raw) return undefined;
  return {
    name: raw.name,
    url: raw.browser_download_url || raw.url || '',
    size: raw.size || 0,
    digest: raw.digest || '',
    downloadCount: raw.download_count || raw.downloadCount || 0,
    contentType: raw.content_type || raw.contentType || '',
  };
}

function parseRelease(raw: RawRelease): ReleaseData {
  const assets: RawAsset[] = raw.assets || [];

  const linuxRpm = findAsset(assets, [/linux.*\.rpm$/i]);
  const linuxTar = findAsset(assets, [/linux.*\.tar\.gz$/i]);
  const macosDmg = findAsset(assets, [/macos.*\.dmg$/i, /mac.*\.dmg$/i]);
  const macosTar = findAsset(assets, [/macos.*\.tar\.gz$/i, /mac.*\.tar\.gz$/i]);
  const winSetup = findAsset(assets, [/windows.*setup.*\.exe$/i, /setup.*\.exe$/i, /\.exe$/i]);
  const winZip = findAsset(assets, [/windows.*\.zip$/i]);

  return {
    version: raw.tag_name || 'v0.1.0',
    name: raw.name || `ctrl+video ${raw.tag_name || 'v0.1.0'}`,
    publishedAt: raw.published_at || new Date().toISOString(),
    releasePageUrl: raw.html_url || `https://github.com/${GH_OWNER}/${GH_REPO}/releases`,
    linux: {
      primaryUrl: linuxRpm?.url || FALLBACK_URLS.linux,
      fallbackUrl: FALLBACK_URLS.linux,
      primary: linuxRpm,
      secondary: linuxTar,
    },
    macos: {
      primaryUrl: macosDmg?.url || FALLBACK_URLS.macos,
      fallbackUrl: FALLBACK_URLS.macos,
      primary: macosDmg,
      secondary: macosTar,
    },
    windows: {
      primaryUrl: winSetup?.url || FALLBACK_URLS.windows,
      fallbackUrl: FALLBACK_URLS.windows,
      primary: winSetup,
      secondary: winZip,
    },
  };
}

export async function getLatestRelease(): Promise<ReleaseData> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (GH_TOKEN) {
    headers.Authorization = `Bearer ${GH_TOKEN}`;
  }

  try {
    const res = await fetch(`${BASE_API}/releases/latest`, {
      headers,
      next: { revalidate: 600, tags: ['release'] },
    });

    if (!res.ok) {
      throw new Error(`GitHub API returned status ${res.status}`);
    }

    const data: RawRelease = await res.json();
    return parseRelease(data);
  } catch (err) {
    console.warn('Failed to fetch latest GitHub release, using fallback configuration:', err);
    return {
      version: 'v0.1.0',
      name: 'ctrl+video v0.1.0',
      publishedAt: '2026-11-24T05:47:03Z',
      releasePageUrl: `https://github.com/${GH_OWNER}/${GH_REPO}/releases/tag/v0.1.0`,
      linux: {
        primaryUrl: FALLBACK_URLS.linux,
        fallbackUrl: FALLBACK_URLS.linux,
        primary: {
          name: 'ctrl_video-linux-x86_64.rpm',
          url: FALLBACK_URLS.linux,
          size: 12685969,
          digest: 'sha256:0cd4e000e9d4832de2656016ffe95b68663db3497ff65e665c90f091fabdf630',
          downloadCount: 0,
          contentType: 'application/x-redhat-package-manager',
        },
        secondary: {
          name: 'ctrl_video-linux-x64.tar.gz',
          url: FALLBACK_URLS.linuxTar,
          size: 12742566,
          digest: 'sha256:518e1a57aec8385631bef2e20876c2dae9ec1ef08c836f50efb0af653234fc5f',
          downloadCount: 0,
          contentType: 'application/gzip',
        },
      },
      macos: {
        primaryUrl: FALLBACK_URLS.macos,
        fallbackUrl: FALLBACK_URLS.macos,
        primary: {
          name: 'ctrl_video-macos-universal.dmg',
          url: FALLBACK_URLS.macos,
          size: 39360624,
          digest: 'sha256:2a965cdb5e0b237da3bc2adc794d44e398365f28b1b658b102e2005f6b08a802',
          downloadCount: 0,
          contentType: 'application/x-apple-diskimage',
        },
        secondary: {
          name: 'ctrl_video-macos.tar.gz',
          url: FALLBACK_URLS.macosTar,
          size: 39442602,
          digest: 'sha256:5f9358d9805947bc05525b9b9659da255a6cd7b75a0656862f8927a915b85e5f',
          downloadCount: 0,
          contentType: 'application/gzip',
        },
      },
      windows: {
        primaryUrl: FALLBACK_URLS.windows,
        fallbackUrl: FALLBACK_URLS.windows,
        primary: {
          name: 'ctrl_video-windows-setup-x64.exe',
          url: FALLBACK_URLS.windows,
          size: 25445130,
          digest: 'sha256:6b43132da145de0a7428acefd4d9bcaf7c110a40f82d7f11907fca1faf885881',
          downloadCount: 0,
          contentType: 'application/x-msdos-program',
        },
        secondary: {
          name: 'ctrl_video-windows-x64.zip',
          url: FALLBACK_URLS.windowsZip,
          size: 32886385,
          digest: 'sha256:35cf7d9d64cd5ca34fb6801fad666866c447711c7f3e490c7ce88a2d1a0bbb51',
          downloadCount: 1,
          contentType: 'application/zip',
        },
      },
    };
  }
}
