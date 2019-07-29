import { Response, Request } from 'express';

import { getInfluencers, addAndGetInfluencers } from "../../helpers";
import { InfluencerI } from "../../interfaces";
const influencers: InfluencerI[] = getInfluencers();


export class Influencer {
  /**
   * Method that gets a single influencer details
   * @method get
   * @param {object} req - request parameter
   * @param {object} res - response parameter
   * @return {object} response detail
   */
  static get(req: Request, res: Response): Response {

    const foundInfluencer: InfluencerI | undefined = influencers
      .find((influencer: InfluencerI) => influencer.id === Number(req.params.id));

    if (!foundInfluencer) {
      return res.status(404).json('Influencer not found');
    }

    return res.status(200).json(foundInfluencer);
  }

  /**
   * Method that adds a new influencer and returns all influencers
   * @method post
   * @param {object} req - request parameter
   * @param {object} res - response parameter
   * @return {object} response detail
   */
  static post(req: Request, res: Response): Response {
    const foundInfluencer: InfluencerI | undefined = influencers
      .find((influencer: InfluencerI) => influencer.id === Number(req.body.id));

    if (foundInfluencer) {
      return res.status(409).json('Influencer already exists.');
    }

    const updatedInfluencers = addAndGetInfluencers(req.body);

    return res.status(201).json(updatedInfluencers);
  }
}
