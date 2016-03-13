
module.exports.makeEvent = function (name, startDateUtc, endDateUtc, address1, address2, city, stateAbbrev, postalCode) {
  return {
    name,
    start_date_utc: startDateUtc,
    end_date_utc: endDateUtc,
    address_street_1: address1,
    address_street_2: address2,
    city: city,
    state_abbrev: stateAbbrev,
    postal_code: postalCode,
  };
};

