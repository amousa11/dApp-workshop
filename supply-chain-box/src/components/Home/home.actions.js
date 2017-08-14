export const INST_CONTRACT = "INST_CONTRACT";
export const INST_CONTRACT_SUCCESS = "INST_CONTRACT_SUCCESS";
export const INST_CONTRACT_FAILURE = "INST_CONTRACT_FAILURE";

export const instantiateContract = function () {
    return {
        type: INST_CONTRACT
    }
}

export const instantiateContractSuccess = function (contract, web3) {
    return {
        type: INST_CONTRACT_SUCCESS,
        web3: web3,
        contract: contract
    }
}

export const instantiateContractFailure = function (error) {
    return {
        type: INST_CONTRACT_FAILURE,
        error: error
    }
}

export const INJECT_WEB3 = "INJECT_WEB3";
export const INJECT_WEB3_SUCCESS = "INJECT_WEB3_SUCCESS";
export const INJECT_WEB3_FAILURE = "INJECT_WEB3_FAILURE";

export const injectWeb3 = function () {
    return {
        type: INJECT_WEB3
    }
}

export const injectWeb3Success = function (web3) {
    return {
        type: INJECT_WEB3_SUCCESS,
        web3: web3
    }
}

export const injectWeb3Failure = function (err) {
    return {
        type: INJECT_WEB3_FAILURE,
        error: err
    }
}