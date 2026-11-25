const packageId = 'website.techalbania.bbttemperaturetracker'

export const promo = {
  app: {
    name: 'FAM Tracker',
    footer: 'FAM · BBT & Fertility Tracker',
    icon: 'assets/icon.png'
  },
  store: {
    packageId,
    url: `https://play.google.com/store/apps/details?id=${packageId}`,
    redeemUrl: 'https://play.google.com/redeem'
  },
  api: {
    endpoint: 'https://script.google.com/macros/s/AKfycbzgwKWCCN0RuIZIfPvKbz3HxdFEHCFoFuDrPWctzOYga5hfpJZPac3gtm0AVcikVNq1iw/exec',
    timeoutMs: 15000
  },
  storage: {
    cookieName: 'fam_promo',
    cookieDays: 3650,
    storeVisitedKey: 'fam_store_visited',
    pendingKey: 'fam_pending_claim'
  },
  ui: {
    feedbackMs: 1600,
    confettiCount: 44,
    confettiColors: ['--violet', '--pink', '--success', '--amber', '--sky']
  },
  pages: {
    claim: 'index.html',
    code: 'code.html'
  },
  copy: {
    claim: {
      pageTitle: 'Get your code',
      eyebrow: 'Free promo code',
      title: 'Get your promo code',
      description: "First check out {app} on the Play Store. Once you're back here, you'll be able to grab your redeemable code to use inside the app.",
      storeStep: 'View on Google Play',
      cta: 'Get my code',
      loading: 'Getting your code...',
      hint: 'Open the Play Store page to unlock your code',
      empty: "We're out of codes right now. Check back soon.",
      generic: 'Something went wrong. Try again.',
      timeout: 'The server took too long to respond. Please try again.',
      network: "Couldn't reach the server. Check your connection and try again."
    },
    code: {
      pageTitle: 'Your promo code',
      label: 'Your promo code',
      tags: { fresh: 'Code ready', repeat: 'Already claimed' },
      claimedOn: 'Claimed on {date}',
      copy: 'Copy',
      copied: 'Copied',
      share: 'Share',
      shareCopied: 'Copied to share',
      shareTitle: '{app} promo code',
      shareText: 'My {app} promo code: {code}',
      redeem: 'Redeem on Google Play',
      store: 'View app on Google Play'
    }
  }
}
