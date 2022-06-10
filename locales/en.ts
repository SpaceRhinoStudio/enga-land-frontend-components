import { Routes } from '../configs/routes'
import { ToastType } from '../contexts/flash-toast'
import {
  CosmeticSlots,
  EndroItemType,
  GodStats,
  ItemRarity,
  MainNFTTypes,
  Realms,
} from '../types/enga'
import { WebsiteLocale } from './interface'
import { EndroSortOptions, MarketplaceSortOptions } from '../types/marketplace'

const locale: WebsiteLocale = new WebsiteLocale({
  main: {
    helloWorld: 'hello world!',
    genericErrorMessage: 'something went wrong',
    unknown: 'unknown!',
    done: 'done!',
    noItem: 'Nothing to show...',
    notAvailable: 'N/A',
    loadMore: 'Load More',
  },
  header: { connectWallet: 'CONNECT WALLET' },
  nav: {
    [Routes.home]: 'Home',
    [Routes.dapp]: 'Dapp',
    [Routes.marketplace]: 'Marketplace',
    [Routes.help]: 'Help',
    [Routes.aboutUs]: 'About Us',
    [Routes.dashboard]: 'Dashboard',
    [Routes.staking]: 'Staking',
    [Routes.exchange]: 'Fundraising',
    [Routes.dao]: 'ENGA Federation',
    [Routes.auction]: 'Auction',
    [Routes.tickets]: 'Acquire Tickets',
    [Routes.telegram]: 'Telegram',
    [Routes.twitter]: 'Twitter',
    [Routes.discord]: 'Discord',
    [Routes.reddit]: 'Reddit',
    [Routes.tokenomics]: 'Tokenomics',
    [Routes.github]: 'GitHub',
    [Routes.community]: 'Community',
    [Routes.docs]: 'Docs',
    [Routes.mpEndro]: 'Endro',
    [Routes.mpOpifexOff]: 'Opifex Machine - Off',
    [Routes.mpOpifexIndexed]: 'Opifex Machine - Indexed',
    [Routes.mpCosmetics]: 'Cosmetics',
    [Routes.mpChipset]: 'Chipset Cards',
    [Routes.mpConsumable]: 'Consumables',
    [Routes.mpAccoutrements]: 'Accoutrement Cards',
    [Routes.mpSkins]: 'Skins',
    [Routes.mpTickets]: 'Raffle Tickets',
    [Routes.mpListings]: 'My Listings',
    [Routes.mpSales]: 'My Sales',
    [Routes.mpPurchases]: 'My Purchases',
    [Routes.mpEndroSingle]: 'Single Endro',
    notFound: "You're Lost!",
  },
  userInteraction: {
    confirmation: { cancel: 'Cancel', confirm: 'Confirm' },
    validations: { numberNotValid: 'Input is not a valid number' },
    web3: { pendingTx: 'Pending' },
    toastTitles: {
      [ToastType.alert]: 'Alert',
      [ToastType.error]: 'Error!',
      [ToastType.info]: 'Info',
      [ToastType.success]: 'Success!',
      [ToastType.warning]: 'Warning!',
    },
  },
  web3Provider: {
    changedWillReload: 'Web3 (wallet) provider has changed. page will reload to apply changes.',
    importEnga: 'Import ENGA',
    networks: {
      live: 'Live',
      test: 'Test',
    },
    connect: {
      title: 'Connect Wallet',
      connected: 'connected',
      disconnected: 'disconnected',
      disconnect: 'Disconnect',
      connectButton: {
        notConnected: 'Please connect your wallet...',
      },
    },
    signFailed: 'you should connect to web3...',
    submittingSignatureFailed: 'Something went wrong submitting your signature.',
  },
  walletProviders: {
    metamask: 'Metamask',
    binanceChain: 'Binance Chain',
    trust: 'Trust',
    safePal: 'Safepal',
  },
  presale: {
    stillPending: 'There is no sale going on right now...',
    notFunding: 'No sale is accepting funds at the moment...',
    contribution: {
      title: 'Contribute',
      approve: 'Approve',
      balance: 'Balance',
      quote: 'You pay',
      base: 'You get',
      rate: 'Exchange Rate',
      swap: 'Swap',
      termsNotice: 'I accept the terms and conditions',
      max: 'MAX',
      unavailable: "You can't contribute at this point.",
    },
    allocations: {
      headers: {
        allocations: 'Allocation',
        ENGA: 'ENGA',
        price: 'Price',
      },
      earlyInvestors: 'Early Investors',
      preSale: 'Pre Sale',
      dao: 'DAO',
      stakeHolders: 'Stake Holders',
      initialSupply: 'Initial Supply',
    },
    vestings: {
      title: 'Open Vestings List',
      headers: {
        txId: 'TX ID',
        amount: 'Amount',
        price: 'Price',
        released: 'Released',
        started: 'Started',
        cliff: 'Cliff',
        end: 'End',
        action: 'Action',
      },
      actions: {
        release: 'Release',
        ableToRelease: 'Currently able to release',
        revoke: 'Revoke',
      },
    },
    errors: {
      notEnoughBalance: "You don't have enough balance",
      lowerThanMinimum: min => `Should be higher than ${min}`,
      cannotRemoveAgreement: 'You cannot take back your agreement',
      shouldAgree: 'You need to accept terms and conditions',
    },
  },
  marketplace: {
    collectionsTitle: 'Collections',
    noCollection: 'Select a collection to continue...',
    generation: 'Generation',
    sort: 'Sort',
    ownerTitle: 'Owner',
    sortTitles: {
      all: 'All',
      [MarketplaceSortOptions.cheap]: 'Cheapest',
      [MarketplaceSortOptions.expensive]: 'Most expensive',
      [MarketplaceSortOptions.latest]: 'Latest',
      [EndroSortOptions.lowerGeneration]: 'Lower generation',
      [EndroSortOptions.higherGeneration]: 'Higher generation',
    },
    endro: {
      xpLeft: xp => `${xp}XP Left`,
      lastSold: 'Last Sold',
      generationLabel: 'GEN',
      levelLabel: 'LVL',
    },
    moreDetails: 'More Details',
    purchase: 'Purchase',
  },
  dashboard: {
    manage: 'Manage',
    nftsOfType: type => `${type} NFTs`,
    listInMarketplace: 'List in marketplace',
    itsYou: 'You',
  },
  EngaVerse: {
    godStats: {
      [GodStats.str]: 'Strength',
      [GodStats.dex]: 'Dexterity',
      [GodStats.con]: 'Constitution',
      [GodStats.men]: 'Mentality',
      [GodStats.com]: 'Common skills',
      [GodStats.agg]: 'Aggressiveness',
    },
    endroSpecs: {
      rarity: 'Rarity Score',
      level: 'Level',
      zeal: 'Zeal',
      generation: 'Generation',
      powerSource: 'Power Source',
      meritPoints: 'Merit Points',
    },
    realms: {
      [Realms.ufm]: 'UFM',
      [Realms.magesta]: 'Magesta',
      [Realms.nubia]: 'Nubia',
      [Realms.sigr]: 'Sigr',
      [Realms.komorebi]: 'Komorebi',
    },
    rarityLevels: {
      [ItemRarity.common]: 'Common',
      [ItemRarity.uncommon]: 'Uncommon',
      [ItemRarity.rare]: 'Rare',
      [ItemRarity.legendary]: 'Legendary',
      [ItemRarity.mythical]: 'Mythical',
      [ItemRarity.celestial]: 'Celestial',
    },
    mainNFTs: {
      [MainNFTTypes.endro]: 'Endro',
      [MainNFTTypes.opifexOff]: 'Opifex Machine - Off',
      [MainNFTTypes.opifexIndexed]: 'Opifex Machine - Indexed',
      [MainNFTTypes.tickets]: 'Raffle Tickets',
      opifex: 'Opifex',
    },
    OtherOnChain: {
      solar: 'Solar',
    },
  },
  endro: {
    cosmeticItems: {
      [CosmeticSlots.head]: 'Head',
      [CosmeticSlots.eye]: 'Eye',
      [CosmeticSlots.body]: 'Body',
      [CosmeticSlots.mask]: 'Mask',
    },
    items: {
      [EndroItemType.cosmetics]: 'Cosmetics',
      [EndroItemType.chipset]: 'Chipset',
      [EndroItemType.consumable]: 'Consumable',
      [EndroItemType.accoutrements]: 'Accoutrements',
      [EndroItemType.skins]: 'Skins',
    },
    itemsSpecs: {
      id: 'ID',
      rarity: 'Rarity',
      brsModifier: 'BRS Modifier',
      mintedOn: 'Mint On',
      replacesItem: 'Replaces',
      slot: 'Slot',
    },
  },
  opifex: {
    state: {
      title: 'State',
      indexed: 'Indexed',
      off: 'Off',
    },
  },
})
export default locale
