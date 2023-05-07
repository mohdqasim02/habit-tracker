const create = function(activity, startDate) {
  return {
    activity,
    startDate,
    streak: 0,
    showedUp: 0,
    sissed: 0,
    sime: 0,
  };
};

exports.create = create;
