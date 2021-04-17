const transformArrayToMap = (list) =>
    list.reduce((accum, item) => ({ ...accum, [item.title]: item }), {});

export default transformArrayToMap;
