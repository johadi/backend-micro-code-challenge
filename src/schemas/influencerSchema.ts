export const createInfluencerSchema: any = {
  id: {
    in: ['body'],
    errorMessage: 'id of type number is required.',
    isInt: true,
    toInt: true
  },
  igFollow: {
    in: ['body'],
    isLength: {
      errorMessage: 'igFollow is required.',
      options: { min: 1 }
    }
  },
  igID: {
    in: ['body'],
    errorMessage: 'Valid igID beginning with "@" is required.',
    matches: {
      options: [/^[@]{1}[A-Za-z0-9]+$/]
    }
  },
  fbID: {
    in: ['body'],
    isLength: {
      errorMessage: 'fbID is required.',
      options: { min: 1 }
    }
  },
  fbFollow: {
    in: ['body'],
    isLength: {
      errorMessage: 'fbFollow is required.',
      options: { min: 1 }
    }
  },
  ytFollow: {
    in: ['body'],
    isLength: {
      errorMessage: 'ytFollow is required.',
      options: { min: 1 }
    }
  },
  ytID: {
    in: ['body'],
    isLength: {
      errorMessage: 'ytID is required.',
      options: { min: 1 }
    }
  },
  fullName: {
    in: ['body'],
    isLength: {
      errorMessage: 'fullName with minimum of 2 characters is required.',
      options: { min: 2 }
    }
  },
  email: {
    in: ['body'],
    isEmail: {
      errorMessage: 'Valid email is required.',
    }
  },
  phone: {
    in: ['body'],
    matches: {
      errorMessage: 'Valid phone number is required, must start with "+" followed by 7 digits.',
      options: [/^[+][0-9]{7}$/]
    }
  },
  ownPromocode: {
    in: ['body'],
    isLength: {
      errorMessage: 'ownPromocode is required.',
      options: { min: 1 }
    }
  },
  refPromoCode: {
    in: ['body'],
    isLength: {
      errorMessage: 'refPromoCode is required.',
      options: { min: 1 }
    }
  },
  refName: {
    in: ['body'],
    isLength: {
      errorMessage: 'refName is required.',
      options: { min: 1 }
    }
  },
};

export const getInfluencerSchema: any = {
  id: {
    in: ['params'],
    errorMessage: 'ID is incorrect. It must be a number.',
    isInt: true,
    // Sanitizers can go here as well
    toInt: true
  }
}
