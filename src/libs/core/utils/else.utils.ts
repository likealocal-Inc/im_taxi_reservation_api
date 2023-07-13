export const ElseUtils = {
  toQueryString: (d) => {
    return Object.keys(d)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(d[k]))
      .join('&');
  },
  getRandomNum: async () => {
    return (
      Math.random().toString(36).substring(2) +
      '' +
      Math.random().toString(36).substring(2)
    );
  },
};
