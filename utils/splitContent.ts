const splitContent = (content: string) => {
  return content.trim().split(" ").splice(0, 16).join(" ") + "...";
};

export default splitContent;
