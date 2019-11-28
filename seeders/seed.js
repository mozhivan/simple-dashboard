/**
  * @fileOverview Contains seed function to generate fake data for development and tests
*/
import _ from 'lodash';
import { faker } from 'meteor/practicalmeteor:faker';
import { models } from '../server/connectors';

const { Articles, Authors, Websites } = models;
const AUTHORS = 5;
const ARTICLES = 100;
const ARTICLES_PER_WEBSITE = 4;

const fakeAuthor = () => Authors.create({
  name: faker.name.findName(),
  email: faker.internet.email(),
  age: Math.floor(Math.random() * 50 + 15),
  country: faker.address.country(),
});

const fakeWebsite = async (articles = []) => {
  const website = await Websites.create({
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    url: faker.internet.url(),
    visitorsCount: faker.random.number(),
  });

  return website.addArticles(articles);
};

const fakeArticle = (author = null) => Articles.create({
  title: faker.lorem.sentence(),
  text: faker.lorem.paragraph(),
  publicationDate: faker.date.past(),
  authorId: author.get('id'),
});
/**
 * Function that generates seed for db
 * @return {Promise} Promise of created article_website rows
 */
const seed = async () => {
  let buffer = _.range(AUTHORS);
  const authors = await Promise.all(buffer.map(async () => fakeAuthor()));

  buffer = _.range(ARTICLES);
  const articles = await Promise.all(buffer.map(async () => fakeArticle(_.sample(authors))));

  buffer = _.chunk(articles, ARTICLES_PER_WEBSITE);
  return Promise.all(buffer.map(async (articles) => fakeWebsite(articles)));
};

export default seed;
