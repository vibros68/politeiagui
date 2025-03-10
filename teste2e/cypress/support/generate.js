import compose from "lodash/fp/compose";
import entries from "lodash/fp/entries";
import reduce from "lodash/fp/reduce";
import range from "lodash/fp/range";
import map from "lodash/fp/map";
import chunk from "lodash/fp/chunk";
import { build, fake } from "test-data-bot";

export const buildUser = build("User").fields({
  email: fake((f) => f.internet.email()),
  username: fake((f) => `user${f.datatype.number()}`),
  password: fake((f) => f.internet.password())
});

export const buildProposal = build("Proposal").fields({
  name: fake((f) => f.lorem.words()),
  description: fake((f) => f.lorem.sentence()),
  // two weeks from now
  startDate: Math.round(new Date().getTime() / 1000) + 1209600,
  // one month from now
  endDate: Math.round(new Date().getTime() / 1000) + 2629746,
  amount: 2000000, // $20k in cents.
  domain: "research"
});

export const buildComment = build("Comment").fields({
  text: fake((f) => f.lorem.sentence())
});

export const buildRecord = build("Record").fields({
  token: fake((f) => f.internet.password(15, false, /[0-9a-z]/)),
  timestamp: Date.now() / 1000,
  username: fake((f) => `user${f.datatype.number()}`),
  userid: fake((f) => f.datatype.uuid()),
  publickey: fake((f) => f.datatype.hexaDecimal(64, false, /[0-9a-z]/)),
  merkle: fake((f) => f.datatype.hexaDecimal(64, false, /[0-9a-z]/)),
  signature: fake((f) => f.datatype.hexaDecimal(128, false, /[0-9a-z]/))
});

export const buildRecordComment = ({
  token,
  state = 2,
  downvotes = 0,
  upvotes = 0,
  commentid
}) =>
  build("RecordComment").fields({
    userid: fake((f) => f.datatype.uuid()),
    username: fake((f) => `user${f.datatype.number()}`),
    state,
    token,
    parentid: 0,
    comment: fake((f) => f.lorem.sentence()),
    publickey: fake((f) => f.datatype.hexaDecimal(64, false, /[0-9a-z]/)),
    signature: fake((f) => f.datatype.hexaDecimal(128, false, /[0-9a-z]/)),
    commentid: commentid || fake((f) => f.datatype.number()),
    timestamp: Date.now() / 1000,
    receipt: fake((f) => f.datatype.hexaDecimal(128, false, /[0-9a-z]/)),
    downvotes,
    upvotes
  })();

const fakeToken = () => buildRecord().token;

/**
 * makeCustomInventoryByStatus returns a custom random token inventory by given
 * { [status]: amount } defined by tokensAmountByStatus.
 *
 * @param {Object} tokensAmountByStatus
 * @param {Number} pageLimit
 */
export const makeCustomInventoryByStatus = (
  tokensAmountByStatus = {},
  pageLimit = 20
) =>
  compose(
    reduce(
      (acc, [status, amount]) => ({
        ...acc,
        [status]: compose(chunk(pageLimit), map(fakeToken), range(amount))(0)
      }),
      {}
    ),
    entries
  )(tokensAmountByStatus);
