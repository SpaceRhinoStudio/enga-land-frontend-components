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
  landing: {
    header: {
      launchDapp: 'LAUNCH APP',
    },
    hero: {
      title: 'Power up your Endro, customize them with NFTs, and fight for glory!',
      subtitle:
        'Embark on a journey on the treacherous realms of Engaland, the land of endless possibilities and threats.',
    },
    teaser: {
      title: 'KNOW ABOUT ENGALAND',
      subtitle:
        'An unknown and mysterious planet, attempts were made to pacify and colonize her by each of the five realms throughout their histories, all failed drastically, no one knew why, until now...',
    },
    realms: {
      title: 'REALMS',
      info: {
        [Realms.sigr]: {
          description:
            'The red planet, Sigr, is ruled over by an aggressive and ruthless empire. Sigrmen and Sigrwomen are known for their extreme resilience and strategized army.',
          subtitle: 'History is written by us.',
          xp: '8.0%',
          zealDefect: '2.0%',
          meritPoints: '1 per 10 levels',
        },
        [Realms.magesta]: {
          description:
            'Magestans are a people of hedonistic lifestyle and decadence. Since the inclusion of the purple planet into the Enga Federation, Magesta has enjoyed a continuous stream of prosperity and wealth.',
          subtitle: 'The beginnings of all things are small.',
          xp: '2.5%',
          zealDefect: '2.5%',
          meritPoints: '2 per 5 levels',
        },
        [Realms.nubia]: {
          description:
            'Located in a dark corner of the Engaverse, the orange planet of Nubia is home to a highly advanced and mysterious civilization. The Nubians are intelligent merchants and have established friendly relations with other civilizations around the galaxy.',
          subtitle: 'Tomorrow is another day.',
          xp: '3.5%',
          zealDefect: '3.0%',
          meritPoints: '2 per 10 levels',
        },
        [Realms.ufm]: {
          description:
            'United Federations of Man started as a peace treaty between multiple nations on their blue planet. They decided to put an end to all wars and countless losses, and to start building a strong and peaceful nation that shines in glory and technology.',
          subtitle: 'UFM strongly believes in friends and foes!',
          xp: '1.0%',
          zealDefect: '6.0%',
          meritPoints: '2 per 9 levels',
        },
        [Realms.komorebi]: {
          description:
            "Komorebi's isolationist and tyrant emperor, rumored to be immortal, mysteriously disappeared one day. A regency council was established to oversee the empire. Since the regency, Komorebi has opened its doors to the outside world.",
          subtitle: 'The future is bright.',
          xp: '2.0%',
          zealDefect: '4.0%',
          meritPoints: '1 per 2 levels',
        },
      },
    },
    features: {
      title: 'FEATURES',
      items: [
        {
          title: 'NFT & DeFi',
          description:
            'Utilizing NFTs lets users be the true owners of their assets. Combined with DeFi, users can earn rewards for their contributions.',
        },
        {
          title: 'What is DAO',
          description:
            'DAO is a decentralized autonomous organization, where users are in control. Enga Federation is the DAO that rules over the Engaverse, and determines its future.',
        },
      ],
    },
    roadmap: {
      title: 'ROADMAP',
      items: [
        {
          title: 'ICO (Q3 2022)',
          items: [
            ['Seed sale', false],
            ['Private sale', false],
            ['Marketing campaign', false],
            ['Public sale', false],
            ['Dapp launch', true],
            ['DAO launch', false],
            ['Token listings on CoinMarketCap & CoinGecko', false],
          ],
        },
        {
          title: 'MARKETPLACE (Q3-Q4 2022)',
          items: [
            ['Endro NFTs', false],
            ['Endro wearables', false],
            ['Consumable NFTs', false],
            ['Rarity farming', false],
            ['Marketing campaign', false],
            ['Auction house/marketplace', false],
            ['Enga game teaser', false],
          ],
        },
        {
          title: 'THE REVEAL (Q1 2023-Q2 2023)',
          items: [
            ['Providing liquidity for DEX', false],
            ['GameDev team incubation', false],
            ['Engaland game', false],
            ['Game server', false],
            ['Enga game beta release', false],
            ['Marketing campaign & twitter trend', false],
          ],
        },
        {
          title: 'MASS ADOPTION (Q3 2023)',
          items: [
            ['First accoutrement drop', false],
            ['Endro skins', false],
            ['CEX listing', false],
            ['Marketing campaign & twitter trend', false],
            ['Game mechanics rebalancing', false],
            ['Lands & lending', false],
          ],
        },
        {
          title: 'FUTURE (Q4 2023 and beyond)',
          items: [
            ['Decentralized gaming blockchain', false],
            ['ERC20, ERC721 & ERC1155 token bridge', false],
            ['Blockchain communication SDK', false],
            ['GameFi marketplace', false],
          ],
        },
      ],
    },
    technologies: {
      title: 'TECHNOLOGIES',
    },
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
    engaland: 'Engaland',
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
