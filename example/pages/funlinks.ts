const links = ['some', 'links', 'from', 'google'];

export default {
  title: 'Fun Links',
  links: links.map((link) => ({
    url: `https://www.google.co.uk/search?q=${link}`,
    title: link,
  })),
};
