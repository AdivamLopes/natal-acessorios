
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = 'kgjdzif9';
const dataset = 'production';
const apiVersion = '2023-05-03';
const token = 'skvb4gyglhOQCVyWPO0Mb5EpScnJnmd1XtTbrZqcqv4EXvcHLP5JIksTcli0KnNdNiWIYP2JbzMnY02leDV2408R6AXjpAReQetOTwvsUGm9q8FYiY6owvx8rU4CJMGXtvnWeK5RcBGj5cj2Hyc3lZJCX4TTbKo5bkzIxYQllbVCxn0vYJTm';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => source ? builder.image(source) : null;
