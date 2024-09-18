import Parse from 'parse/node'
export interface IUser extends Parse.User {
  username: string;
  email: string;
  fullname: string;
  phone: string;
  password: string;
  emailVerified: boolean;

  //OTHERs
  termsAccepted: boolean;
  emergencyContact: object;
  driverLicense: string;
  driverLicenseImageUrl: string;
  payment: PPayment;
  registrationCompleted: boolean;
  validated: boolean;
  user: PUser;
  fullname: string;
  validationNotes: string;
  idNumber: string;
  profilePic: string;
  active: boolean;
  registered: boolean;
  averageRating: string;
  ratings: string;
}

