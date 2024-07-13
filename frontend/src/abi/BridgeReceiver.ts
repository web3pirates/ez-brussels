export const BridgeReceiverAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_aavePool",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "optionType",
        type: "uint16",
      },
    ],
    name: "InvalidOptionType",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "bits",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "SafeCastOverflowedUintDowncast",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes",
        name: "composeMessage",
        type: "bytes",
      },
    ],
    name: "MessageArrived",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_guid",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_message",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "_executor",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_extraData",
        type: "bytes",
      },
    ],
    name: "lzCompose",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_stargate",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "_dstEid",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_composeMsg",
        type: "bytes",
      },
    ],
    name: "prepareTakeTaxi",
    outputs: [
      {
        internalType: "uint256",
        name: "valueToSend",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint32",
            name: "dstEid",
            type: "uint32",
          },
          {
            internalType: "bytes32",
            name: "to",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "amountLD",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minAmountLD",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "extraOptions",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "composeMsg",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "oftCmd",
            type: "bytes",
          },
        ],
        internalType: "struct SendParam",
        name: "sendParam",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "nativeFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lzTokenFee",
            type: "uint256",
          },
        ],
        internalType: "struct MessagingFee",
        name: "messagingFee",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "testWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "testWithdrawNative",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
