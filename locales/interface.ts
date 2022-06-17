import type { Routes } from '../configs/routes'
import type { ToastType } from '../contexts/flash-toast'
import type { VestingType } from '$lib/observables/pre-sale/signers-vestings'
import type { Web3ProviderId } from '$lib/types'
import type { ValueTypeUnion } from '../types'
import type {
  CosmeticSlots,
  EndroItemType,
  GodStats,
  ItemRarity,
  MainNFTTypes,
  Realms,
} from '../types/enga'
import {
  type MarketplaceFilterKeys,
  marketplaceSortOptions,
} from '$lib/observables/enga/marketplace-items'
export interface WebsiteLocaleData {
  main: {
    helloWorld: string
    genericErrorMessage: string
    unknown: string
    done: string
    noItem: string
    notAvailable: string
    loadMore: string
  }
  landing: {
    header: {
      launchDapp: string
    }
    hero: {
      title: string
      subtitle: string
    }
    teaser: {
      title: string
      subtitle: string
    }
    realms: {
      title: string
      info: {
        [key in Realms]: {
          description: string
          xp: string
          zealDefect: string
          meritPoints: string
          subtitle: string
        }
      }
    }
    features: {
      title: string
      items: {
        title: string
        description: string
      }[]
    }
    roadmap: {
      title: string
      items: {
        title: string
        items: [string, boolean][]
      }[]
    }
    technologies: {
      title: string
    }
  }
  header: {
    connectWallet: string
  }
  nav: {
    [key in Routes]: string
  } & { notFound: string }
  userInteraction: {
    confirmation: {
      confirm: string
      cancel: string
    }
    validations: {
      numberNotValid: string
    }
    web3: {
      pendingTx: string
    }
    toastTitles: { [key in ToastType]: string }
  }
  web3Provider: {
    changedWillReload: string
    importEnga: string
    connect: {
      title: string
      connected: string
      disconnected: string
      disconnect: string
      connectButton: {
        notConnected: string
      }
    }
    networks: {
      live: string
      test: string
    }
    signFailed: string
    submittingSignatureFailed: string
  }
  walletProviders: {
    [id in Web3ProviderId]: string
  }
  presale: {
    stillPending: string
    notFunding: string
    contribution: {
      title: string
      base: string
      quote: string
      balance: string
      rate: string
      termsNotice: string
      approve: string
      swap: string
      max: string
      unavailable: string
    }
    allocations: {
      headers: {
        allocations: string
        ENGA: string
        price: string
      }
      earlyInvestors: string
      preSale: string
      dao: string
      stakeHolders: string
      initialSupply: string
    }
    vestings: {
      title: string
      headers: {
        [key in keyof Omit<VestingType, 'vestId' | 'saleContractAddress'>]: string
      } & { action: string }
      actions: {
        release: string
        ableToRelease: string
        revoke: string
      }
    }
    errors: {
      notEnoughBalance: string
      lowerThanMinimum: (min: string) => string
      cannotRemoveAgreement: string
      shouldAgree: string
    }
  }
  marketplace: {
    collectionsTitle: string
    noCollection: string
    sort: string
    ownerTitle: string
    sortTitles: {
      [key in ValueTypeUnion<typeof marketplaceSortOptions>[number]]: string
    }
    filterTitles: {
      [key in MarketplaceFilterKeys | 'all']: string
    }
    endro: {
      xpLeft: (xp: string | number) => string
      lastSold: string
      generationLabel: string
      levelLabel: string
    }
    moreDetails: string
    purchase: string
  }
  dashboard: {
    manage: string
    nftsOfType: (type: string) => string
    listInMarketplace: string
    itsYou: string
  }
  EngaVerse: {
    engaland: string
    godStats: {
      [key in GodStats]: string
    }
    endroSpecs: {
      rarity: string
      level: string
      zeal: string
      generation: string
      powerSource: string
      meritPoints: string
    }
    realms: {
      [key in Realms]: string
    }
    rarityLevels: {
      [key in ItemRarity]: string
    }
    mainNFTs: {
      [key in MainNFTTypes | 'opifex']: string
    }
    OtherOnChain: {
      solar: string
    }
  }
  endro: {
    cosmeticItems: {
      [key in CosmeticSlots]: string
    }
    items: {
      [key in EndroItemType]: string
    }
    itemsSpecs: {
      id: string
      rarity: string
      mintedOn: string
      brsModifier: string
      replacesItem: string
      slot: string
    }
  }
  opifex: {
    state: {
      title: string
      indexed: string
      off: string
    }
  }
}
export class WebsiteLocale {
  constructor(public data: WebsiteLocaleData) {}
}
