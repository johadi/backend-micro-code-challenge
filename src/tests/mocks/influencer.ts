export const validationErrorMessages = {
  createInfluencerErrors: {
    id: 'id of type number is required.',
    igFollow: 'igFollow is required.',
    igID: 'Valid igID beginning with "@" is required.',
    fbID: 'fbID is required.',
    fbFollow: 'fbFollow is required.',
    ytFollow: 'ytFollow is required.',
    ytID: 'ytID is required.',
    fullName: 'fullName with minimum of 2 characters is required.',
    email: 'Valid email is required.',
    phone: 'Valid phone number is required, must start with "+" followed by 7 digits.',
    ownPromocode: 'ownPromocode is required.',
    refPromoCode: 'refPromoCode is required.',
    refName: 'refName is required.'
  },
  getInfluencerErros: {
    id: 'ID is incorrect. It must be a number.'
  }
};

export const createExpectedErrorMessages = (nullableFields: string[] = []) => {
  const errorMessages: {[key: string]: string | null} = {};

  nullableFields.forEach((field) => errorMessages[field] = null);

  return {
    ...validationErrorMessages.createInfluencerErrors,
    ...errorMessages
  }
};

const validInfluencer = {
  id: 5,
  igFollow: '5k-20k',
  igID: '@testInfluencer',
  fbID: 'CodeChallengeGuy',
  fbFollow: '0-5k',
  ytFollow: '0-5k',
  ytID: 'CodeChallengeGuy',
  fullName: 'Code Challenge',
  email: 'codeChallengeGuy@viiva.com',
  phone: '+1234567',
  ownPromocode: 'winthecode',
  refPromoCode: 'viivadevteam',
  refName: 'Code Guy Referrer'
};

export const newInfluencerPayload = {
  validPayload: { ...validInfluencer },
  invalidPhone: {
    tooLongPayload: {
      ...validInfluencer,
      phone: '+123456'
    },
    tooShortPayload: {
      ...validInfluencer,
      phone: '+12345678'
    },
    noPlusSymbolPayload: {
      ...validInfluencer,
      phone: '1234567'
    }
  },
  invalidEmail: {
    noDotSymbolPayload: {
      ...validInfluencer,
      email: 'jimohhadi@gmailcom'
    },
    noAtSymbolPayload: {
      ...validInfluencer,
      email: 'jimohhadigmail.com'
    }
  }
};

export const existingInfluencer = {
  id: 1,
  igFollow: '5k-20k',
  igID: '@testInfluencer',
  fbID: 'CodeChallengeGuy',
  fbFollow: '0-5k',
  ytFollow: '0-5k',
  ytID: 'CodeChallengeGuy',
  fullName: 'Code Challenge',
  email: 'codeChallengeGuy@viiva.com',
  phone: '+1111111',
  ownPromocode: 'winthecode',
  refPromoCode: 'viivadevteam',
  refName: 'Code Guy Referrer'
};

export const nonExistingInfluencer = {
  id: 30,
  igFollow: '5k-20k',
  igID: '@testInfluencer',
  fbID: 'CodeChallengeGuy',
  fbFollow: '0-5k',
  ytFollow: '0-5k',
  ytID: 'CodeChallengeGuy',
  fullName: 'Code Challenge',
  email: 'codeChallengeGuy@viiva.com',
  phone: '+1234567',
  ownPromocode: 'winthecode',
  refPromoCode: 'viivadevteam',
  refName: 'Code Guy Referrer'
};

export const getInfluencerNofFoundExpectedErrorMessage = 'Influencer not found';
export const createInfluencerAlreadyExistsExpectedErrorMessage = 'Influencer already exists.';