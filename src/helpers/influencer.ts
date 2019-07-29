import * as fs from "fs";
import * as path from "path";
import { ValidationError } from "express-validator";

import { InfluencerI } from "../interfaces";

const influencerPath = path.join(__dirname, '../../mocks/influencers.json');

/**
 * Helper function that gets all influencers
 * @function getInfluencers
 * @return {array} all influencers
 */
export const getInfluencers = (): InfluencerI[] =>
  JSON.parse(fs.readFileSync(influencerPath).toString());

/**
 * Helper function that adds new influencer and return the updated influencers array
 * @function addAndGetInfluencers
 * @param {object} newInfluencer - new influencer
 * @return {array} all influencers
 */
export const addAndGetInfluencers = (newInfluencer: InfluencerI): InfluencerI[] => {
  const influencers = getInfluencers();
  influencers.push(newInfluencer);
  let data = JSON.stringify(influencers);
  fs.writeFileSync(influencerPath, data);

  return influencers;
};

/**
 * Helper function that removes influencer and return id of the influencer
 * @function removeInfluencer
 * @param {object} id - id of influencer
 * @return {string} id of influencer
 */
export const removeInfluencer = (id: number): void => {
  const influencers = getInfluencers();
  const foundIndex = influencers.findIndex(influencer => influencer.id === id);

  if (foundIndex === -1) {
    return;
  }

  influencers.splice(foundIndex, 1);
  let data = JSON.stringify(influencers);
  fs.writeFileSync(influencerPath, data);
};

/**
 * Helper function that finds and gets error message using a field name
 * @function getErrorMessage
 * @param {object} errors - error messages
 * @param {string} field - field to look for in the errors
 * @return {string} error message
 */
export const getErrorMessage = (errors: ValidationError[], field: string): string | null => {
  if (errors) {
    const foundError = errors.find((error) => error.param === field);

    return foundError ? foundError.msg : null;
  }

  return null;
};