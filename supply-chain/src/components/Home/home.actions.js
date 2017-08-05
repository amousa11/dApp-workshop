export const INST_CONTRACT = "INST_CONTRACT";
export const INST_CONTRACT_SUCCESS = "INST_CONTRACT_SUCCESS";
export const INST_CONTRACT_FAILURE = "INST_CONTRACT_FAILURE";

export const instantiateContract = function () {
    return {
        type: INST_CONTRACT
    }
}

export const instantiateContractSuccess = function (contract) {
    return {
        type: INST_CONTRACT_SUCCESS,
        contract: contract
    }
}

export const instantiateContractFailure = function (error) {
    return {
        type: INST_CONTRACT_FAILURE,
        error: error
    }
}