import {
  PROPOSAL_VOTING_INELIGIBLE,
  PROPOSAL_VOTING_AUTHORIZED,
  PROPOSAL_VOTING_NOT_AUTHORIZED,
  PROPOSAL_VOTING_ACTIVE,
  PROPOSAL_VOTING_APPROVED,
  PROPOSAL_VOTING_REJECTED
} from "src/constants";

export const tabValues = {
  UNDER_REVIEW: "Under Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  INELIGIBLE: "Abandoned"
};

export const noProposalMessage = "No proposals available";

export const statusByTab = {
  [tabValues.UNDER_REVIEW]: [
    PROPOSAL_VOTING_ACTIVE,
    PROPOSAL_VOTING_AUTHORIZED,
    PROPOSAL_VOTING_NOT_AUTHORIZED
  ],
  [tabValues.APPROVED]: [PROPOSAL_VOTING_APPROVED],
  [tabValues.REJECTED]: [PROPOSAL_VOTING_REJECTED],
  [tabValues.INELIGIBLE]: [PROPOSAL_VOTING_INELIGIBLE]
};

export const sortByTab = {
  [tabValues.UNDER_REVIEW]: {
    fields: ["voteStatus", "timestamp"],
    order: ["desc", "desc"]
  }
  // For other tabs = undefined (get the default)
  // { fields: ["timestamp"], order: ["desc"] }
};
