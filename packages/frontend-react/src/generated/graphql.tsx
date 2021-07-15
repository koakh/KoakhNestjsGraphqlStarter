import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** Date custom scalar type */
  Date: any;
};

export type Query = {
  __typename?: 'Query';
  causes: Array<Cause>;
  causeOngoing: Array<Cause>;
  causeComplexQuery: Array<Cause>;
  causeById: Cause;
  participants: Array<Participant>;
  participantComplexQuery: Array<Participant>;
  participantById: Participant;
  participantByCode: Participant;
  persons: Array<Person>;
  personByAttribute: Array<Person>;
  personComplexQuery: Array<Person>;
  personById: Person;
  personByUsername: Person;
  personByFiscalNumber: Person;
  personProfile: Person;
  transactions: Array<Transaction>;
  transactionComplexQuery: Array<Transaction>;
  transactionById: Transaction;
  assets: Array<Asset>;
  assetComplexQuery: Array<Asset>;
  assetById: Asset;
  reactForceData: GraphData;
};


export type QueryCausesArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryCauseOngoingArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  date: Scalars['Float'];
};


export type QueryCauseComplexQueryArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  getByComplexQueryInput: GetByComplexQueryInput;
};


export type QueryCauseByIdArgs = {
  id: Scalars['String'];
};


export type QueryParticipantsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryParticipantComplexQueryArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  getByComplexQueryInput: GetByComplexQueryInput;
};


export type QueryParticipantByIdArgs = {
  id: Scalars['String'];
};


export type QueryParticipantByCodeArgs = {
  code: Scalars['String'];
};


export type QueryPersonsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryPersonByAttributeArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  getByAttributeInput: GetByAttributeInput;
};


export type QueryPersonComplexQueryArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  getByComplexQueryInput: GetByComplexQueryInput;
};


export type QueryPersonByIdArgs = {
  id: Scalars['String'];
};


export type QueryPersonByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryPersonByFiscalNumberArgs = {
  fiscalNumber: Scalars['String'];
};


export type QueryTransactionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryTransactionComplexQueryArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  getByComplexQueryInput: GetByComplexQueryInput;
};


export type QueryTransactionByIdArgs = {
  id: Scalars['String'];
};


export type QueryAssetsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryAssetComplexQueryArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  getByComplexQueryInput: GetByComplexQueryInput;
};


export type QueryAssetByIdArgs = {
  id: Scalars['String'];
};


export type QueryReactForceDataArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type Cause = {
  __typename?: 'Cause';
  id: Scalars['ID'];
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  ambassadors?: Maybe<Array<Scalars['String']>>;
  startDate?: Maybe<Scalars['Float']>;
  endDate?: Maybe<Scalars['Float']>;
  location?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  input: EntityResult;
  participant: Participant;
  createdDate: Scalars['Float'];
  createdByPersonId?: Maybe<Scalars['String']>;
  fundsBalance: GenericBalance;
  volunteeringHoursBalance: GenericBalance;
  goodsStock?: Maybe<Array<Goods>>;
};


export type EntityResult = {
  __typename?: 'EntityResult';
  entity: Entity;
};

export type Entity = {
  __typename?: 'Entity';
  id: Scalars['ID'];
  type: Scalars['String'];
  createdDate: Scalars['Float'];
};

export type Participant = {
  __typename?: 'Participant';
  id: Scalars['ID'];
  code: Scalars['String'];
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  fiscalNumber: Scalars['String'];
  ambassadors?: Maybe<Array<Scalars['String']>>;
  msp: Scalars['String'];
  participant?: Maybe<Participant>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  createdDate: Scalars['Float'];
  createdByPersonId?: Maybe<Scalars['String']>;
  fundsBalance: GenericBalance;
  volunteeringHoursBalance: GenericBalance;
  goodsStock?: Maybe<Array<Goods>>;
};

export type GenericBalance = {
  __typename?: 'GenericBalance';
  debit: Scalars['Float'];
  credit: Scalars['Float'];
  balance: Scalars['Float'];
};

export type Goods = {
  __typename?: 'Goods';
  id: Scalars['ID'];
  code: Scalars['String'];
  barCode?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  balance: GenericBalance;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  createdDate: Scalars['Float'];
  createdByPersonId: Scalars['String'];
};

export type GetByComplexQueryInput = {
  filter: Scalars['JSONObject'];
  fields?: Maybe<Array<Scalars['String']>>;
  sort?: Maybe<Array<Scalars['JSONObject']>>;
};

export type Person = {
  __typename?: 'Person';
  id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  attributes?: Maybe<Array<Attribute>>;
  roles?: Maybe<Array<Scalars['String']>>;
  participant: Participant;
  createdDate: Scalars['Float'];
  registrationDate: Scalars['Date'];
  mobilePhone: Scalars['String'];
  postal?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  geoLocation?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  personalInfo?: Maybe<Scalars['String']>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  profile?: Maybe<Scalars['JSONObject']>;
  fundsBalance: GenericBalance;
  volunteeringHoursBalance: GenericBalance;
  goodsStock?: Maybe<Array<Goods>>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  fatherFirstName?: Maybe<Scalars['String']>;
  fatherLastName?: Maybe<Scalars['String']>;
  motherFirstName?: Maybe<Scalars['String']>;
  motherLastName?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['Date']>;
  nationality?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  documentNumber?: Maybe<Scalars['String']>;
  documentType?: Maybe<Scalars['String']>;
  cardVersion?: Maybe<Scalars['String']>;
  emissionDate?: Maybe<Scalars['Date']>;
  expirationDate?: Maybe<Scalars['Date']>;
  emittingEntity?: Maybe<Scalars['String']>;
  identityNumber?: Maybe<Scalars['String']>;
  fiscalNumber: Scalars['String'];
  socialSecurityNumber?: Maybe<Scalars['String']>;
  beneficiaryNumber?: Maybe<Scalars['String']>;
  pan?: Maybe<Scalars['String']>;
  requestLocation?: Maybe<Scalars['String']>;
  otherInformation?: Maybe<Scalars['String']>;
};

export type Attribute = {
  __typename?: 'Attribute';
  id: Scalars['ID'];
  content?: Maybe<Scalars['JSONObject']>;
  issuedDate?: Maybe<Scalars['Float']>;
  expiresDate?: Maybe<Scalars['Date']>;
  expired?: Maybe<Scalars['Boolean']>;
  certifierID?: Maybe<Scalars['String']>;
};


export type GetByAttributeInput = {
  id: Scalars['String'];
  content?: Maybe<Scalars['JSONObject']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['ID'];
  transactionType: Scalars['String'];
  resourceType: Scalars['String'];
  input: EntityResult;
  output: EntityResult;
  quantity?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  participant?: Maybe<Participant>;
  createdDate: Scalars['Float'];
  createdByPersonId?: Maybe<Scalars['String']>;
  assetId?: Maybe<Scalars['String']>;
  goods?: Maybe<Array<Goods>>;
};

export type Asset = {
  __typename?: 'Asset';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  assetType: Scalars['String'];
  ambassadors?: Maybe<Array<Scalars['String']>>;
  owner: EntityResult;
  location?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  participant: Participant;
  createdDate: Scalars['Float'];
  createdByPersonId?: Maybe<Scalars['String']>;
};

export type GraphData = {
  __typename?: 'GraphData';
  nodes?: Maybe<Array<GraphNode>>;
  links?: Maybe<Array<GraphLink>>;
};

export type GraphNode = {
  __typename?: 'GraphNode';
  id: Scalars['ID'];
  label: Scalars['String'];
  desc?: Maybe<Scalars['String']>;
  nodeVal?: Maybe<Scalars['Float']>;
  color?: Maybe<Scalars['String']>;
  autoColorBy?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['Float']>;
};

export type GraphLink = {
  __typename?: 'GraphLink';
  source: Scalars['ID'];
  target: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  desc?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  autoColorBy?: Maybe<Scalars['String']>;
  linkWidth?: Maybe<Scalars['Float']>;
  group?: Maybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  personLogin: PersonLoginResponse;
  personLogout: Scalars['Boolean'];
  revokeUserRefreshTokens: Scalars['Boolean'];
  causeNew: Cause;
  causeUpdate: Cause;
  participantNew: Participant;
  participantUpdate: Participant;
  participantChangeIdentity: Participant;
  personRegister: Person;
  personAddAttribute: Person;
  personUpdate: Person;
  personUpdatePassword: Person;
  personUpdateProfile: Person;
  personUpsertCitizenCard: Person;
  transactionNew: Transaction;
  transactionUpdate: Transaction;
  assetNew: Asset;
  assetUpdate: Asset;
};


export type MutationPersonLoginArgs = {
  loginPersonData: LoginPersonInput;
};


export type MutationRevokeUserRefreshTokensArgs = {
  username: Scalars['String'];
};


export type MutationCauseNewArgs = {
  newCauseData: NewCauseInput;
};


export type MutationCauseUpdateArgs = {
  updateCauseData: UpdateCauseInput;
};


export type MutationParticipantNewArgs = {
  newParticipantData: NewParticipantInput;
};


export type MutationParticipantUpdateArgs = {
  updateParticipantData: UpdateParticipantInput;
};


export type MutationParticipantChangeIdentityArgs = {
  changeParticipantIdentityData: ChangeParticipantIdentityData;
};


export type MutationPersonRegisterArgs = {
  newPersonData: NewPersonInput;
};


export type MutationPersonAddAttributeArgs = {
  addPersonAttributeData: AddPersonAttributeInput;
  personId: Scalars['String'];
};


export type MutationPersonUpdateArgs = {
  updatePersonData: UpdatePersonInput;
};


export type MutationPersonUpdatePasswordArgs = {
  updatePersonPasswordData: UpdatePersonPasswordInput;
};


export type MutationPersonUpdateProfileArgs = {
  updatePersonProfileData: UpdatePersonProfileInput;
};


export type MutationPersonUpsertCitizenCardArgs = {
  upsertCitizenCardData: UpsertCitizenCardInput;
};


export type MutationTransactionNewArgs = {
  newTransactionData: NewTransactionInput;
};


export type MutationTransactionUpdateArgs = {
  updateTransactionData: UpdateTransactionInput;
};


export type MutationAssetNewArgs = {
  newAssetData: NewAssetInput;
};


export type MutationAssetUpdateArgs = {
  updateAssetData: UpdateAssetInput;
};

export type LoginPersonInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type PersonLoginResponse = {
  __typename?: 'PersonLoginResponse';
  user: Person;
  accessToken: Scalars['String'];
};

export type NewCauseInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  ambassadors?: Maybe<Array<Scalars['String']>>;
  startDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  location?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  loggedPersonId?: Maybe<Scalars['String']>;
  input: Scalars['JSONObject'];
};

export type UpdateCauseInput = {
  id: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  ambassadors?: Maybe<Array<Scalars['String']>>;
  tags?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
};

export type NewParticipantInput = {
  id?: Maybe<Scalars['String']>;
  code: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  fiscalNumber: Scalars['String'];
  ambassadors?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  loggedPersonId?: Maybe<Scalars['String']>;
};

export type UpdateParticipantInput = {
  id: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  ambassadors?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
};

export type ChangeParticipantIdentityData = {
  id: Scalars['String'];
  newIdentity: Scalars['String'];
};

export type NewPersonInput = {
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  mobilePhone: Scalars['String'];
  postal?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  geoLocation?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  personalInfo?: Maybe<Scalars['String']>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  profile?: Maybe<Scalars['JSONObject']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  fatherFirstName?: Maybe<Scalars['String']>;
  fatherLastName?: Maybe<Scalars['String']>;
  motherFirstName?: Maybe<Scalars['String']>;
  motherLastName?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['Date']>;
  nationality?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  documentNumber?: Maybe<Scalars['String']>;
  documentType?: Maybe<Scalars['String']>;
  cardVersion?: Maybe<Scalars['String']>;
  emissionDate?: Maybe<Scalars['Date']>;
  expirationDate?: Maybe<Scalars['Date']>;
  emittingEntity?: Maybe<Scalars['String']>;
  identityNumber?: Maybe<Scalars['String']>;
  fiscalNumber: Scalars['String'];
  socialSecurityNumber?: Maybe<Scalars['String']>;
  beneficiaryNumber?: Maybe<Scalars['String']>;
  pan?: Maybe<Scalars['String']>;
  requestLocation?: Maybe<Scalars['String']>;
  otherInformation?: Maybe<Scalars['String']>;
};

export type AddPersonAttributeInput = {
  id: Scalars['ID'];
  content?: Maybe<Scalars['JSONObject']>;
  issuedDate?: Maybe<Scalars['Float']>;
  expiresDate?: Maybe<Scalars['Date']>;
  expired?: Maybe<Scalars['Boolean']>;
  certifierID?: Maybe<Scalars['String']>;
};

export type UpdatePersonInput = {
  id: Scalars['String'];
  roles?: Maybe<Array<Scalars['String']>>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
};

export type UpdatePersonPasswordInput = {
  id: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type UpdatePersonProfileInput = {
  id: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  mobilePhone: Scalars['String'];
  postal?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  geoLocation?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  personalInfo?: Maybe<Scalars['String']>;
  metaData?: Maybe<Scalars['JSONObject']>;
};

export type UpsertCitizenCardInput = {
  id?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  gender: Scalars['String'];
  height: Scalars['Float'];
  fatherFirstName: Scalars['String'];
  fatherLastName: Scalars['String'];
  motherFirstName: Scalars['String'];
  motherLastName: Scalars['String'];
  birthDate: Scalars['Date'];
  nationality: Scalars['String'];
  country: Scalars['String'];
  documentNumber: Scalars['String'];
  documentType: Scalars['String'];
  cardVersion: Scalars['String'];
  emissionDate: Scalars['Date'];
  expirationDate: Scalars['Date'];
  emittingEntity: Scalars['String'];
  identityNumber: Scalars['String'];
  fiscalNumber: Scalars['String'];
  socialSecurityNumber: Scalars['String'];
  beneficiaryNumber: Scalars['String'];
  pan: Scalars['String'];
  requestLocation?: Maybe<Scalars['String']>;
  otherInformation?: Maybe<Scalars['String']>;
};

export type NewTransactionInput = {
  id?: Maybe<Scalars['String']>;
  transactionType: Scalars['String'];
  resourceType: Scalars['String'];
  input: Scalars['JSONObject'];
  output: Scalars['JSONObject'];
  quantity?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  loggedPersonId?: Maybe<Scalars['String']>;
  assetId?: Maybe<Scalars['String']>;
  goods?: Maybe<Array<GoodsInput>>;
};

export type GoodsInput = {
  id?: Maybe<Scalars['ID']>;
  code: Scalars['String'];
  barCode?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  quantity: Scalars['Float'];
  tags?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
};

export type UpdateTransactionInput = {
  id: Scalars['String'];
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
};

export type NewAssetInput = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  assetType: Scalars['String'];
  ambassadors?: Maybe<Array<Scalars['String']>>;
  owner: Scalars['JSONObject'];
  location?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
  loggedPersonId?: Maybe<Scalars['String']>;
};

export type UpdateAssetInput = {
  id: Scalars['String'];
  ambassadors?: Maybe<Array<Scalars['String']>>;
  tags?: Maybe<Array<Scalars['String']>>;
  metaData?: Maybe<Scalars['JSONObject']>;
  metaDataInternal?: Maybe<Scalars['JSONObject']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  personLogged: Scalars['String'];
  causeAdded: Cause;
  causeUpdated: Cause;
  participantAdded: Participant;
  participantUpdated: Participant;
  participantIdentityChanged: Participant;
  personAdded: Person;
  personAttributeAdded: Person;
  personUpdated: Person;
  personPasswordUpdated: Person;
  personProfileUpdated: Person;
  personCitizenCardUpserted: Person;
  transactionAdded: Transaction;
  transactionUpdated: Transaction;
  assetAdded: Asset;
  assetUpdated: Asset;
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken: Scalars['String'];
};

export type X509Identities = {
  __typename?: 'x509Identities';
  id?: Maybe<Scalars['ID']>;
  status: Scalars['Boolean'];
  fingerprint: Scalars['String'];
};

export type AssetNewMutationVariables = Exact<{
  newAssetData: NewAssetInput;
}>;


export type AssetNewMutation = (
  { __typename?: 'Mutation' }
  & { assetNew: (
    { __typename?: 'Asset' }
    & Pick<Asset, 'id' | 'name' | 'assetType' | 'ambassadors' | 'location' | 'tags' | 'metaData' | 'metaDataInternal' | 'createdDate' | 'createdByPersonId'>
    & { owner: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type'>
      ) }
    ), participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name'>
    ) }
  ) }
);

export type AssetUpdateMutationVariables = Exact<{
  updateAssetData: UpdateAssetInput;
}>;


export type AssetUpdateMutation = (
  { __typename?: 'Mutation' }
  & { assetUpdate: (
    { __typename?: 'Asset' }
    & Pick<Asset, 'id' | 'name' | 'ambassadors' | 'tags' | 'metaData' | 'metaDataInternal'>
  ) }
);

export type CauseNewMutationVariables = Exact<{
  newCauseData: NewCauseInput;
}>;


export type CauseNewMutation = (
  { __typename?: 'Mutation' }
  & { causeNew: (
    { __typename?: 'Cause' }
    & Pick<Cause, 'id' | 'name' | 'email' | 'ambassadors' | 'startDate' | 'endDate' | 'location' | 'tags' | 'createdDate' | 'createdByPersonId' | 'metaData' | 'metaDataInternal'>
    & { input: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type'>
      ) }
    ), participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'code' | 'name'>
    ) }
  ) }
);

export type CauseUpdateMutationVariables = Exact<{
  updateCauseData: UpdateCauseInput;
}>;


export type CauseUpdateMutation = (
  { __typename?: 'Mutation' }
  & { causeUpdate: (
    { __typename?: 'Cause' }
    & Pick<Cause, 'id' | 'name' | 'email' | 'ambassadors' | 'tags' | 'metaData' | 'metaDataInternal'>
  ) }
);

export type ParticipantNewMutationVariables = Exact<{
  newParticipantData: NewParticipantInput;
}>;


export type ParticipantNewMutation = (
  { __typename?: 'Mutation' }
  & { participantNew: (
    { __typename?: 'Participant' }
    & Pick<Participant, 'id' | 'code' | 'name' | 'email' | 'fiscalNumber' | 'msp'>
  ) }
);

export type ParticipantUpdateMutationVariables = Exact<{
  updateParticipantData: UpdateParticipantInput;
}>;


export type ParticipantUpdateMutation = (
  { __typename?: 'Mutation' }
  & { participantUpdate: (
    { __typename?: 'Participant' }
    & Pick<Participant, 'id' | 'name' | 'ambassadors' | 'metaData' | 'metaDataInternal'>
  ) }
);

export type PersonAddAttributeMutationVariables = Exact<{
  personId: Scalars['String'];
  addPersonAttributeData: AddPersonAttributeInput;
}>;


export type PersonAddAttributeMutation = (
  { __typename?: 'Mutation' }
  & { personAddAttribute: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'profile' | 'firstName' | 'lastName' | 'gender' | 'height' | 'fatherFirstName' | 'fatherLastName' | 'motherFirstName' | 'motherLastName' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate'>
    & { attributes?: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    ) }
  ) }
);

export type PersonLoginMutationVariables = Exact<{
  loginPersonData: LoginPersonInput;
}>;


export type PersonLoginMutation = (
  { __typename?: 'Mutation' }
  & { personLogin: (
    { __typename?: 'PersonLoginResponse' }
    & Pick<PersonLoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'profile' | 'firstName' | 'lastName' | 'gender' | 'height' | 'fatherFirstName' | 'fatherLastName' | 'motherFirstName' | 'motherLastName' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate'>
      & { attributes?: Maybe<Array<(
        { __typename?: 'Attribute' }
        & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
      )>>, participant: (
        { __typename?: 'Participant' }
        & Pick<Participant, 'id' | 'name' | 'msp'>
      ) }
    ) }
  ) }
);

export type PersonLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type PersonLogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'personLogout'>
);

export type PersonRegisterMutationVariables = Exact<{
  newPersonData: NewPersonInput;
}>;


export type PersonRegisterMutation = (
  { __typename?: 'Mutation' }
  & { personRegister: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'firstName' | 'lastName' | 'username' | 'email' | 'roles'>
    & { attributes?: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    ) }
  ) }
);

export type PersonUpdateMutationVariables = Exact<{
  updatePersonData: UpdatePersonInput;
}>;


export type PersonUpdateMutation = (
  { __typename?: 'Mutation' }
  & { personUpdate: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'roles' | 'metaDataInternal'>
  ) }
);

export type PersonUpdatePasswordMutationVariables = Exact<{
  updatePersonPasswordData: UpdatePersonPasswordInput;
}>;


export type PersonUpdatePasswordMutation = (
  { __typename?: 'Mutation' }
  & { personUpdatePassword: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'roles' | 'metaDataInternal'>
  ) }
);

export type PersonUpdateProfileMutationVariables = Exact<{
  updatePersonProfileData: UpdatePersonProfileInput;
}>;


export type PersonUpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { personUpdateProfile: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'email' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'metaData'>
  ) }
);

export type PersonUpsertCitizenCardMutationVariables = Exact<{
  upsertCitizenCardData: UpsertCitizenCardInput;
}>;


export type PersonUpsertCitizenCardMutation = (
  { __typename?: 'Mutation' }
  & { personUpsertCitizenCard: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'documentNumber' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'firstName' | 'lastName' | 'gender' | 'height' | 'fatherFirstName' | 'fatherLastName' | 'motherFirstName' | 'motherLastName' | 'birthDate' | 'nationality' | 'country' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'requestLocation' | 'otherInformation'>
  ) }
);

export type TransactionNewMutationVariables = Exact<{
  newTransactionData: NewTransactionInput;
}>;


export type TransactionNewMutation = (
  { __typename?: 'Mutation' }
  & { transactionNew: (
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'transactionType' | 'resourceType' | 'assetId' | 'quantity' | 'currency' | 'location' | 'tags' | 'createdDate' | 'createdByPersonId' | 'metaData' | 'metaDataInternal'>
    & { input: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type'>
      ) }
    ), output: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type'>
      ) }
    ), participant?: Maybe<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    )> }
  ) }
);

export type TransactionUpdateMutationVariables = Exact<{
  updateTransactionData: UpdateTransactionInput;
}>;


export type TransactionUpdateMutation = (
  { __typename?: 'Mutation' }
  & { transactionUpdate: (
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'metaDataInternal'>
  ) }
);

export type AssetByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type AssetByIdQuery = (
  { __typename?: 'Query' }
  & { assetById: (
    { __typename?: 'Asset' }
    & Pick<Asset, 'id' | 'name' | 'description' | 'assetType' | 'ambassadors' | 'location' | 'tags' | 'createdDate' | 'createdByPersonId' | 'metaData' | 'metaDataInternal'>
    & { owner: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type'>
      ) }
    ), participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name'>
    ) }
  ) }
);

export type AssetComplexQueryQueryVariables = Exact<{
  getByComplexQueryInput: GetByComplexQueryInput;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type AssetComplexQueryQuery = (
  { __typename?: 'Query' }
  & { assetComplexQuery: Array<(
    { __typename?: 'Asset' }
    & Pick<Asset, 'id' | 'name' | 'assetType' | 'ambassadors' | 'location' | 'tags' | 'createdDate' | 'createdByPersonId' | 'metaData' | 'metaDataInternal'>
    & { owner: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type'>
      ) }
    ), participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name'>
    ) }
  )> }
);

export type AssetsQueryVariables = Exact<{
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type AssetsQuery = (
  { __typename?: 'Query' }
  & { assets: Array<(
    { __typename?: 'Asset' }
    & Pick<Asset, 'id' | 'name' | 'assetType' | 'ambassadors' | 'location' | 'tags' | 'createdDate' | 'createdByPersonId' | 'metaData' | 'metaDataInternal'>
    & { owner: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type'>
      ) }
    ), participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name'>
    ) }
  )> }
);

export type CauseByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CauseByIdQuery = (
  { __typename?: 'Query' }
  & { causeById: (
    { __typename?: 'Cause' }
    & Pick<Cause, 'id' | 'name' | 'email' | 'ambassadors' | 'startDate' | 'endDate' | 'location' | 'tags' | 'metaData' | 'createdDate' | 'createdByPersonId' | 'metaDataInternal'>
    & { input: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type' | 'createdDate'>
      ) }
    ), participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    ), fundsBalance: (
      { __typename?: 'GenericBalance' }
      & Pick<GenericBalance, 'debit' | 'credit' | 'balance'>
    ), volunteeringHoursBalance: (
      { __typename?: 'GenericBalance' }
      & Pick<GenericBalance, 'debit' | 'credit' | 'balance'>
    ), goodsStock?: Maybe<Array<(
      { __typename?: 'Goods' }
      & Pick<Goods, 'id' | 'code' | 'barCode' | 'name' | 'description' | 'tags' | 'metaData' | 'metaDataInternal' | 'createdDate' | 'createdByPersonId'>
      & { balance: (
        { __typename?: 'GenericBalance' }
        & Pick<GenericBalance, 'debit' | 'credit' | 'balance'>
      ) }
    )>> }
  ) }
);

export type CauseComplexQueryQueryVariables = Exact<{
  getByComplexQueryInput: GetByComplexQueryInput;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type CauseComplexQueryQuery = (
  { __typename?: 'Query' }
  & { causeComplexQuery: Array<(
    { __typename?: 'Cause' }
    & Pick<Cause, 'id' | 'name' | 'ambassadors' | 'startDate' | 'endDate' | 'location' | 'tags' | 'metaData' | 'createdDate' | 'createdByPersonId' | 'metaDataInternal'>
    & { input: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type' | 'createdDate'>
      ) }
    ), participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    ) }
  )> }
);

export type CauseOngoingQueryVariables = Exact<{
  date: Scalars['Float'];
}>;


export type CauseOngoingQuery = (
  { __typename?: 'Query' }
  & { causeOngoing: Array<(
    { __typename?: 'Cause' }
    & Pick<Cause, 'id' | 'name' | 'ambassadors' | 'startDate' | 'endDate' | 'location' | 'tags' | 'metaData' | 'createdDate' | 'createdByPersonId' | 'metaDataInternal'>
    & { input: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type' | 'createdDate'>
      ) }
    ), participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    ) }
  )> }
);

export type CausesQueryVariables = Exact<{
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type CausesQuery = (
  { __typename?: 'Query' }
  & { causes: Array<(
    { __typename?: 'Cause' }
    & Pick<Cause, 'id' | 'name' | 'email' | 'ambassadors' | 'startDate' | 'endDate' | 'location' | 'tags' | 'metaData' | 'createdDate' | 'createdByPersonId' | 'metaDataInternal'>
    & { input: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type' | 'createdDate'>
      ) }
    ), participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    ), fundsBalance: (
      { __typename?: 'GenericBalance' }
      & Pick<GenericBalance, 'debit' | 'credit' | 'balance'>
    ), volunteeringHoursBalance: (
      { __typename?: 'GenericBalance' }
      & Pick<GenericBalance, 'debit' | 'credit' | 'balance'>
    ), goodsStock?: Maybe<Array<(
      { __typename?: 'Goods' }
      & Pick<Goods, 'id' | 'code' | 'barCode' | 'name' | 'description' | 'tags'>
      & { balance: (
        { __typename?: 'GenericBalance' }
        & Pick<GenericBalance, 'debit' | 'credit' | 'balance'>
      ) }
    )>> }
  )> }
);

export type ParticipantByCodeQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type ParticipantByCodeQuery = (
  { __typename?: 'Query' }
  & { participantByCode: (
    { __typename?: 'Participant' }
    & Pick<Participant, 'id' | 'code' | 'name' | 'ambassadors' | 'msp' | 'createdDate' | 'createdByPersonId' | 'metaData' | 'metaDataInternal'>
    & { participant?: Maybe<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    )> }
  ) }
);

export type ParticipantByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ParticipantByIdQuery = (
  { __typename?: 'Query' }
  & { participantById: (
    { __typename?: 'Participant' }
    & Pick<Participant, 'id' | 'name' | 'msp' | 'createdDate'>
    & { participant?: Maybe<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    )> }
  ) }
);

export type ParticipantsQueryVariables = Exact<{
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type ParticipantsQuery = (
  { __typename?: 'Query' }
  & { participants: Array<(
    { __typename?: 'Participant' }
    & Pick<Participant, 'id' | 'name' | 'email' | 'fiscalNumber' | 'ambassadors' | 'msp' | 'createdDate'>
    & { participant?: Maybe<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    )> }
  )> }
);

export type ParticipantComplexQueryQueryVariables = Exact<{
  getByComplexQueryInput: GetByComplexQueryInput;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type ParticipantComplexQueryQuery = (
  { __typename?: 'Query' }
  & { participantComplexQuery: Array<(
    { __typename?: 'Participant' }
    & Pick<Participant, 'id' | 'name' | 'ambassadors' | 'msp' | 'createdDate' | 'createdByPersonId' | 'metaData' | 'metaDataInternal'>
    & { participant?: Maybe<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    )> }
  )> }
);

export type PersonByAttributeQueryVariables = Exact<{
  getByAttributeInput: GetByAttributeInput;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type PersonByAttributeQuery = (
  { __typename?: 'Query' }
  & { personByAttribute: Array<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'profile' | 'firstName' | 'lastName' | 'gender' | 'height' | 'fatherFirstName' | 'fatherLastName' | 'motherFirstName' | 'motherLastName' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate' | 'createdDate'>
    & { attributes?: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    ) }
  )> }
);

export type PersonByFiscalNumberQueryVariables = Exact<{
  fiscalNumber: Scalars['String'];
}>;


export type PersonByFiscalNumberQuery = (
  { __typename?: 'Query' }
  & { personByFiscalNumber: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'firstName' | 'lastName' | 'username' | 'fiscalNumber' | 'email' | 'documentNumber' | 'roles'>
    & { attributes?: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>> }
  ) }
);

export type PersonByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PersonByIdQuery = (
  { __typename?: 'Query' }
  & { personById: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'profile' | 'firstName' | 'lastName' | 'gender' | 'height' | 'fatherFirstName' | 'fatherLastName' | 'motherFirstName' | 'motherLastName' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate' | 'createdDate'>
    & { attributes?: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    ) }
  ) }
);

export type PersonByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type PersonByUsernameQuery = (
  { __typename?: 'Query' }
  & { personByUsername: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'firstName' | 'lastName' | 'username' | 'email' | 'roles' | 'createdDate'>
    & { attributes?: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    ) }
  ) }
);

export type PersonComplexQueryQueryVariables = Exact<{
  getByComplexQueryInput: GetByComplexQueryInput;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type PersonComplexQueryQuery = (
  { __typename?: 'Query' }
  & { personComplexQuery: Array<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'firstName' | 'lastName' | 'username' | 'fiscalNumber' | 'email' | 'roles' | 'createdDate' | 'metaData' | 'metaDataInternal'>
    & { attributes?: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>> }
  )> }
);

export type PersonProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type PersonProfileQuery = (
  { __typename?: 'Query' }
  & { personProfile: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'profile' | 'firstName' | 'lastName' | 'gender' | 'height' | 'fatherFirstName' | 'fatherLastName' | 'motherFirstName' | 'motherLastName' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate' | 'createdDate'>
    & { attributes?: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    ) }
  ) }
);

export type PersonsQueryVariables = Exact<{
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type PersonsQuery = (
  { __typename?: 'Query' }
  & { persons: Array<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'username' | 'email' | 'roles' | 'mobilePhone' | 'postal' | 'city' | 'region' | 'geoLocation' | 'timezone' | 'personalInfo' | 'profile' | 'firstName' | 'lastName' | 'gender' | 'height' | 'fatherFirstName' | 'fatherLastName' | 'motherFirstName' | 'motherLastName' | 'birthDate' | 'nationality' | 'country' | 'documentNumber' | 'documentType' | 'cardVersion' | 'emissionDate' | 'expirationDate' | 'emittingEntity' | 'identityNumber' | 'fiscalNumber' | 'socialSecurityNumber' | 'beneficiaryNumber' | 'pan' | 'requestLocation' | 'otherInformation' | 'registrationDate' | 'createdDate'>
    & { attributes?: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'code' | 'name' | 'email' | 'fiscalNumber' | 'ambassadors' | 'msp' | 'createdDate'>
      & { fundsBalance: (
        { __typename?: 'GenericBalance' }
        & Pick<GenericBalance, 'debit' | 'credit' | 'balance'>
      ), volunteeringHoursBalance: (
        { __typename?: 'GenericBalance' }
        & Pick<GenericBalance, 'debit' | 'credit' | 'balance'>
      ) }
    ), fundsBalance: (
      { __typename?: 'GenericBalance' }
      & Pick<GenericBalance, 'debit' | 'credit' | 'balance'>
    ), volunteeringHoursBalance: (
      { __typename?: 'GenericBalance' }
      & Pick<GenericBalance, 'debit' | 'credit' | 'balance'>
    ), goodsStock?: Maybe<Array<(
      { __typename?: 'Goods' }
      & Pick<Goods, 'id' | 'code' | 'barCode' | 'name' | 'description' | 'tags' | 'metaData' | 'metaDataInternal' | 'createdDate' | 'createdByPersonId'>
      & { balance: (
        { __typename?: 'GenericBalance' }
        & Pick<GenericBalance, 'debit' | 'credit' | 'balance'>
      ) }
    )>> }
  )> }
);

export type ReactForceDataQueryVariables = Exact<{
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type ReactForceDataQuery = (
  { __typename?: 'Query' }
  & { reactForceData: (
    { __typename?: 'GraphData' }
    & { nodes?: Maybe<Array<(
      { __typename?: 'GraphNode' }
      & Pick<GraphNode, 'id' | 'label' | 'desc' | 'nodeVal' | 'color' | 'autoColorBy' | 'group'>
    )>>, links?: Maybe<Array<(
      { __typename?: 'GraphLink' }
      & Pick<GraphLink, 'source' | 'target' | 'label' | 'desc' | 'color' | 'autoColorBy' | 'group'>
    )>> }
  ) }
);

export type TransactionsByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TransactionsByIdQuery = (
  { __typename?: 'Query' }
  & { transactionById: (
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'transactionType' | 'resourceType' | 'assetId' | 'quantity' | 'currency' | 'location' | 'tags' | 'createdDate' | 'createdByPersonId' | 'metaData' | 'metaDataInternal'>
    & { input: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type'>
      ) }
    ), output: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type'>
      ) }
    ), goods?: Maybe<Array<(
      { __typename?: 'Goods' }
      & Pick<Goods, 'id' | 'code' | 'barCode' | 'name' | 'description' | 'tags' | 'metaData' | 'metaDataInternal' | 'createdDate' | 'createdByPersonId'>
      & { balance: (
        { __typename?: 'GenericBalance' }
        & Pick<GenericBalance, 'debit' | 'credit' | 'balance'>
      ) }
    )>>, participant?: Maybe<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    )> }
  ) }
);

export type TransactionComplexQueryQueryVariables = Exact<{
  getByComplexQueryInput: GetByComplexQueryInput;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type TransactionComplexQueryQuery = (
  { __typename?: 'Query' }
  & { transactionComplexQuery: Array<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'transactionType' | 'resourceType' | 'assetId' | 'quantity' | 'currency' | 'location' | 'tags' | 'createdDate' | 'createdByPersonId' | 'metaData' | 'metaDataInternal'>
    & { input: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type'>
      ) }
    ), output: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type'>
      ) }
    ), participant?: Maybe<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    )> }
  )> }
);

export type TransactionsQueryVariables = Exact<{
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type TransactionsQuery = (
  { __typename?: 'Query' }
  & { transactions: Array<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'transactionType' | 'resourceType' | 'assetId' | 'quantity' | 'currency' | 'location' | 'tags' | 'createdDate' | 'createdByPersonId' | 'metaData' | 'metaDataInternal'>
    & { input: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type'>
      ) }
    ), output: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type'>
      ) }
    ), participant?: Maybe<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    )> }
  )> }
);

export type AssetAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type AssetAddedSubscription = (
  { __typename?: 'Subscription' }
  & { assetAdded: (
    { __typename?: 'Asset' }
    & Pick<Asset, 'id' | 'name' | 'description' | 'assetType' | 'ambassadors' | 'location' | 'tags' | 'metaData'>
    & { owner: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type'>
      ) }
    ) }
  ) }
);

export type CauseAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CauseAddedSubscription = (
  { __typename?: 'Subscription' }
  & { causeAdded: (
    { __typename?: 'Cause' }
    & Pick<Cause, 'id' | 'name' | 'ambassadors' | 'startDate' | 'endDate' | 'location' | 'tags' | 'metaData' | 'createdDate'>
    & { input: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id'>
      ) }
    ) }
  ) }
);

export type ParticipantAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ParticipantAddedSubscription = (
  { __typename?: 'Subscription' }
  & { participantAdded: (
    { __typename?: 'Participant' }
    & Pick<Participant, 'id' | 'name' | 'msp'>
  ) }
);

export type PersonAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PersonAddedSubscription = (
  { __typename?: 'Subscription' }
  & { personAdded: (
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'firstName' | 'lastName' | 'username' | 'email' | 'roles'>
    & { attributes?: Maybe<Array<(
      { __typename?: 'Attribute' }
      & Pick<Attribute, 'id' | 'content' | 'issuedDate' | 'expiresDate' | 'expired' | 'certifierID'>
    )>>, participant: (
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    ) }
  ) }
);

export type PersonLoggedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PersonLoggedSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'personLogged'>
);

export type TransactionAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TransactionAddedSubscription = (
  { __typename?: 'Subscription' }
  & { transactionAdded: (
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'transactionType' | 'resourceType' | 'quantity' | 'currency' | 'location' | 'tags' | 'metaData' | 'metaDataInternal' | 'createdDate'>
    & { input: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type' | 'createdDate'>
      ) }
    ), output: (
      { __typename?: 'EntityResult' }
      & { entity: (
        { __typename?: 'Entity' }
        & Pick<Entity, 'id' | 'type' | 'createdDate'>
      ) }
    ), participant?: Maybe<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'msp'>
    )> }
  ) }
);


export const AssetNewDocument = gql`
    mutation assetNew($newAssetData: NewAssetInput!) {
  assetNew(newAssetData: $newAssetData) {
    id
    name
    assetType
    owner {
      entity {
        id
        type
      }
    }
    ambassadors
    location
    tags
    metaData
    metaDataInternal
    participant {
      id
      name
    }
    createdDate
    createdByPersonId
    metaData
    metaDataInternal
  }
}
    `;
export type AssetNewMutationFn = Apollo.MutationFunction<AssetNewMutation, AssetNewMutationVariables>;

/**
 * __useAssetNewMutation__
 *
 * To run a mutation, you first call `useAssetNewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssetNewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assetNewMutation, { data, loading, error }] = useAssetNewMutation({
 *   variables: {
 *      newAssetData: // value for 'newAssetData'
 *   },
 * });
 */
export function useAssetNewMutation(baseOptions?: Apollo.MutationHookOptions<AssetNewMutation, AssetNewMutationVariables>) {
        return Apollo.useMutation<AssetNewMutation, AssetNewMutationVariables>(AssetNewDocument, baseOptions);
      }
export type AssetNewMutationHookResult = ReturnType<typeof useAssetNewMutation>;
export type AssetNewMutationResult = Apollo.MutationResult<AssetNewMutation>;
export type AssetNewMutationOptions = Apollo.BaseMutationOptions<AssetNewMutation, AssetNewMutationVariables>;
export const AssetUpdateDocument = gql`
    mutation assetUpdate($updateAssetData: UpdateAssetInput!) {
  assetUpdate(updateAssetData: $updateAssetData) {
    id
    name
    ambassadors
    tags
    metaData
    metaDataInternal
  }
}
    `;
export type AssetUpdateMutationFn = Apollo.MutationFunction<AssetUpdateMutation, AssetUpdateMutationVariables>;

/**
 * __useAssetUpdateMutation__
 *
 * To run a mutation, you first call `useAssetUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssetUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assetUpdateMutation, { data, loading, error }] = useAssetUpdateMutation({
 *   variables: {
 *      updateAssetData: // value for 'updateAssetData'
 *   },
 * });
 */
export function useAssetUpdateMutation(baseOptions?: Apollo.MutationHookOptions<AssetUpdateMutation, AssetUpdateMutationVariables>) {
        return Apollo.useMutation<AssetUpdateMutation, AssetUpdateMutationVariables>(AssetUpdateDocument, baseOptions);
      }
export type AssetUpdateMutationHookResult = ReturnType<typeof useAssetUpdateMutation>;
export type AssetUpdateMutationResult = Apollo.MutationResult<AssetUpdateMutation>;
export type AssetUpdateMutationOptions = Apollo.BaseMutationOptions<AssetUpdateMutation, AssetUpdateMutationVariables>;
export const CauseNewDocument = gql`
    mutation causeNew($newCauseData: NewCauseInput!) {
  causeNew(newCauseData: $newCauseData) {
    id
    name
    email
    ambassadors
    startDate
    endDate
    input {
      entity {
        id
        type
      }
    }
    location
    tags
    participant {
      id
      code
      name
    }
    createdDate
    createdByPersonId
    metaData
    metaDataInternal
  }
}
    `;
export type CauseNewMutationFn = Apollo.MutationFunction<CauseNewMutation, CauseNewMutationVariables>;

/**
 * __useCauseNewMutation__
 *
 * To run a mutation, you first call `useCauseNewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCauseNewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [causeNewMutation, { data, loading, error }] = useCauseNewMutation({
 *   variables: {
 *      newCauseData: // value for 'newCauseData'
 *   },
 * });
 */
export function useCauseNewMutation(baseOptions?: Apollo.MutationHookOptions<CauseNewMutation, CauseNewMutationVariables>) {
        return Apollo.useMutation<CauseNewMutation, CauseNewMutationVariables>(CauseNewDocument, baseOptions);
      }
export type CauseNewMutationHookResult = ReturnType<typeof useCauseNewMutation>;
export type CauseNewMutationResult = Apollo.MutationResult<CauseNewMutation>;
export type CauseNewMutationOptions = Apollo.BaseMutationOptions<CauseNewMutation, CauseNewMutationVariables>;
export const CauseUpdateDocument = gql`
    mutation causeUpdate($updateCauseData: UpdateCauseInput!) {
  causeUpdate(updateCauseData: $updateCauseData) {
    id
    name
    email
    ambassadors
    tags
    metaData
    metaDataInternal
  }
}
    `;
export type CauseUpdateMutationFn = Apollo.MutationFunction<CauseUpdateMutation, CauseUpdateMutationVariables>;

/**
 * __useCauseUpdateMutation__
 *
 * To run a mutation, you first call `useCauseUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCauseUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [causeUpdateMutation, { data, loading, error }] = useCauseUpdateMutation({
 *   variables: {
 *      updateCauseData: // value for 'updateCauseData'
 *   },
 * });
 */
export function useCauseUpdateMutation(baseOptions?: Apollo.MutationHookOptions<CauseUpdateMutation, CauseUpdateMutationVariables>) {
        return Apollo.useMutation<CauseUpdateMutation, CauseUpdateMutationVariables>(CauseUpdateDocument, baseOptions);
      }
export type CauseUpdateMutationHookResult = ReturnType<typeof useCauseUpdateMutation>;
export type CauseUpdateMutationResult = Apollo.MutationResult<CauseUpdateMutation>;
export type CauseUpdateMutationOptions = Apollo.BaseMutationOptions<CauseUpdateMutation, CauseUpdateMutationVariables>;
export const ParticipantNewDocument = gql`
    mutation participantNew($newParticipantData: NewParticipantInput!) {
  participantNew(newParticipantData: $newParticipantData) {
    id
    code
    name
    email
    fiscalNumber
    msp
  }
}
    `;
export type ParticipantNewMutationFn = Apollo.MutationFunction<ParticipantNewMutation, ParticipantNewMutationVariables>;

/**
 * __useParticipantNewMutation__
 *
 * To run a mutation, you first call `useParticipantNewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useParticipantNewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [participantNewMutation, { data, loading, error }] = useParticipantNewMutation({
 *   variables: {
 *      newParticipantData: // value for 'newParticipantData'
 *   },
 * });
 */
export function useParticipantNewMutation(baseOptions?: Apollo.MutationHookOptions<ParticipantNewMutation, ParticipantNewMutationVariables>) {
        return Apollo.useMutation<ParticipantNewMutation, ParticipantNewMutationVariables>(ParticipantNewDocument, baseOptions);
      }
export type ParticipantNewMutationHookResult = ReturnType<typeof useParticipantNewMutation>;
export type ParticipantNewMutationResult = Apollo.MutationResult<ParticipantNewMutation>;
export type ParticipantNewMutationOptions = Apollo.BaseMutationOptions<ParticipantNewMutation, ParticipantNewMutationVariables>;
export const ParticipantUpdateDocument = gql`
    mutation participantUpdate($updateParticipantData: UpdateParticipantInput!) {
  participantUpdate(updateParticipantData: $updateParticipantData) {
    id
    name
    ambassadors
    metaData
    metaDataInternal
  }
}
    `;
export type ParticipantUpdateMutationFn = Apollo.MutationFunction<ParticipantUpdateMutation, ParticipantUpdateMutationVariables>;

/**
 * __useParticipantUpdateMutation__
 *
 * To run a mutation, you first call `useParticipantUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useParticipantUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [participantUpdateMutation, { data, loading, error }] = useParticipantUpdateMutation({
 *   variables: {
 *      updateParticipantData: // value for 'updateParticipantData'
 *   },
 * });
 */
export function useParticipantUpdateMutation(baseOptions?: Apollo.MutationHookOptions<ParticipantUpdateMutation, ParticipantUpdateMutationVariables>) {
        return Apollo.useMutation<ParticipantUpdateMutation, ParticipantUpdateMutationVariables>(ParticipantUpdateDocument, baseOptions);
      }
export type ParticipantUpdateMutationHookResult = ReturnType<typeof useParticipantUpdateMutation>;
export type ParticipantUpdateMutationResult = Apollo.MutationResult<ParticipantUpdateMutation>;
export type ParticipantUpdateMutationOptions = Apollo.BaseMutationOptions<ParticipantUpdateMutation, ParticipantUpdateMutationVariables>;
export const PersonAddAttributeDocument = gql`
    mutation personAddAttribute($personId: String!, $addPersonAttributeData: AddPersonAttributeInput!) {
  personAddAttribute(personId: $personId, addPersonAttributeData: $addPersonAttributeData) {
    id
    username
    email
    attributes {
      id
      content
      issuedDate
      expiresDate
      expired
      certifierID
    }
    roles
    participant {
      id
      name
      msp
    }
    mobilePhone
    postal
    city
    region
    geoLocation
    timezone
    personalInfo
    profile
    firstName
    lastName
    gender
    height
    fatherFirstName
    fatherLastName
    motherFirstName
    motherLastName
    birthDate
    nationality
    country
    documentNumber
    documentType
    cardVersion
    emissionDate
    expirationDate
    emittingEntity
    identityNumber
    fiscalNumber
    socialSecurityNumber
    beneficiaryNumber
    pan
    requestLocation
    otherInformation
    registrationDate
  }
}
    `;
export type PersonAddAttributeMutationFn = Apollo.MutationFunction<PersonAddAttributeMutation, PersonAddAttributeMutationVariables>;

/**
 * __usePersonAddAttributeMutation__
 *
 * To run a mutation, you first call `usePersonAddAttributeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePersonAddAttributeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [personAddAttributeMutation, { data, loading, error }] = usePersonAddAttributeMutation({
 *   variables: {
 *      personId: // value for 'personId'
 *      addPersonAttributeData: // value for 'addPersonAttributeData'
 *   },
 * });
 */
export function usePersonAddAttributeMutation(baseOptions?: Apollo.MutationHookOptions<PersonAddAttributeMutation, PersonAddAttributeMutationVariables>) {
        return Apollo.useMutation<PersonAddAttributeMutation, PersonAddAttributeMutationVariables>(PersonAddAttributeDocument, baseOptions);
      }
export type PersonAddAttributeMutationHookResult = ReturnType<typeof usePersonAddAttributeMutation>;
export type PersonAddAttributeMutationResult = Apollo.MutationResult<PersonAddAttributeMutation>;
export type PersonAddAttributeMutationOptions = Apollo.BaseMutationOptions<PersonAddAttributeMutation, PersonAddAttributeMutationVariables>;
export const PersonLoginDocument = gql`
    mutation personLogin($loginPersonData: LoginPersonInput!) {
  personLogin(loginPersonData: $loginPersonData) {
    accessToken
    user {
      id
      username
      email
      attributes {
        id
        content
        issuedDate
        expiresDate
        expired
        certifierID
      }
      roles
      participant {
        id
        name
        msp
      }
      mobilePhone
      postal
      city
      region
      geoLocation
      timezone
      personalInfo
      profile
      firstName
      lastName
      gender
      height
      fatherFirstName
      fatherLastName
      motherFirstName
      motherLastName
      birthDate
      nationality
      country
      documentNumber
      documentType
      cardVersion
      emissionDate
      expirationDate
      emittingEntity
      identityNumber
      fiscalNumber
      socialSecurityNumber
      beneficiaryNumber
      pan
      requestLocation
      otherInformation
      registrationDate
    }
  }
}
    `;
export type PersonLoginMutationFn = Apollo.MutationFunction<PersonLoginMutation, PersonLoginMutationVariables>;

/**
 * __usePersonLoginMutation__
 *
 * To run a mutation, you first call `usePersonLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePersonLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [personLoginMutation, { data, loading, error }] = usePersonLoginMutation({
 *   variables: {
 *      loginPersonData: // value for 'loginPersonData'
 *   },
 * });
 */
export function usePersonLoginMutation(baseOptions?: Apollo.MutationHookOptions<PersonLoginMutation, PersonLoginMutationVariables>) {
        return Apollo.useMutation<PersonLoginMutation, PersonLoginMutationVariables>(PersonLoginDocument, baseOptions);
      }
export type PersonLoginMutationHookResult = ReturnType<typeof usePersonLoginMutation>;
export type PersonLoginMutationResult = Apollo.MutationResult<PersonLoginMutation>;
export type PersonLoginMutationOptions = Apollo.BaseMutationOptions<PersonLoginMutation, PersonLoginMutationVariables>;
export const PersonLogoutDocument = gql`
    mutation personLogout {
  personLogout
}
    `;
export type PersonLogoutMutationFn = Apollo.MutationFunction<PersonLogoutMutation, PersonLogoutMutationVariables>;

/**
 * __usePersonLogoutMutation__
 *
 * To run a mutation, you first call `usePersonLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePersonLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [personLogoutMutation, { data, loading, error }] = usePersonLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function usePersonLogoutMutation(baseOptions?: Apollo.MutationHookOptions<PersonLogoutMutation, PersonLogoutMutationVariables>) {
        return Apollo.useMutation<PersonLogoutMutation, PersonLogoutMutationVariables>(PersonLogoutDocument, baseOptions);
      }
export type PersonLogoutMutationHookResult = ReturnType<typeof usePersonLogoutMutation>;
export type PersonLogoutMutationResult = Apollo.MutationResult<PersonLogoutMutation>;
export type PersonLogoutMutationOptions = Apollo.BaseMutationOptions<PersonLogoutMutation, PersonLogoutMutationVariables>;
export const PersonRegisterDocument = gql`
    mutation personRegister($newPersonData: NewPersonInput!) {
  personRegister(newPersonData: $newPersonData) {
    id
    firstName
    lastName
    username
    email
    attributes {
      id
      content
      issuedDate
      expiresDate
      expired
      certifierID
    }
    roles
    participant {
      id
      name
      msp
    }
  }
}
    `;
export type PersonRegisterMutationFn = Apollo.MutationFunction<PersonRegisterMutation, PersonRegisterMutationVariables>;

/**
 * __usePersonRegisterMutation__
 *
 * To run a mutation, you first call `usePersonRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePersonRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [personRegisterMutation, { data, loading, error }] = usePersonRegisterMutation({
 *   variables: {
 *      newPersonData: // value for 'newPersonData'
 *   },
 * });
 */
export function usePersonRegisterMutation(baseOptions?: Apollo.MutationHookOptions<PersonRegisterMutation, PersonRegisterMutationVariables>) {
        return Apollo.useMutation<PersonRegisterMutation, PersonRegisterMutationVariables>(PersonRegisterDocument, baseOptions);
      }
export type PersonRegisterMutationHookResult = ReturnType<typeof usePersonRegisterMutation>;
export type PersonRegisterMutationResult = Apollo.MutationResult<PersonRegisterMutation>;
export type PersonRegisterMutationOptions = Apollo.BaseMutationOptions<PersonRegisterMutation, PersonRegisterMutationVariables>;
export const PersonUpdateDocument = gql`
    mutation personUpdate($updatePersonData: UpdatePersonInput!) {
  personUpdate(updatePersonData: $updatePersonData) {
    id
    roles
    metaDataInternal
  }
}
    `;
export type PersonUpdateMutationFn = Apollo.MutationFunction<PersonUpdateMutation, PersonUpdateMutationVariables>;

/**
 * __usePersonUpdateMutation__
 *
 * To run a mutation, you first call `usePersonUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePersonUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [personUpdateMutation, { data, loading, error }] = usePersonUpdateMutation({
 *   variables: {
 *      updatePersonData: // value for 'updatePersonData'
 *   },
 * });
 */
export function usePersonUpdateMutation(baseOptions?: Apollo.MutationHookOptions<PersonUpdateMutation, PersonUpdateMutationVariables>) {
        return Apollo.useMutation<PersonUpdateMutation, PersonUpdateMutationVariables>(PersonUpdateDocument, baseOptions);
      }
export type PersonUpdateMutationHookResult = ReturnType<typeof usePersonUpdateMutation>;
export type PersonUpdateMutationResult = Apollo.MutationResult<PersonUpdateMutation>;
export type PersonUpdateMutationOptions = Apollo.BaseMutationOptions<PersonUpdateMutation, PersonUpdateMutationVariables>;
export const PersonUpdatePasswordDocument = gql`
    mutation personUpdatePassword($updatePersonPasswordData: UpdatePersonPasswordInput!) {
  personUpdatePassword(updatePersonPasswordData: $updatePersonPasswordData) {
    id
    roles
    metaDataInternal
  }
}
    `;
export type PersonUpdatePasswordMutationFn = Apollo.MutationFunction<PersonUpdatePasswordMutation, PersonUpdatePasswordMutationVariables>;

/**
 * __usePersonUpdatePasswordMutation__
 *
 * To run a mutation, you first call `usePersonUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePersonUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [personUpdatePasswordMutation, { data, loading, error }] = usePersonUpdatePasswordMutation({
 *   variables: {
 *      updatePersonPasswordData: // value for 'updatePersonPasswordData'
 *   },
 * });
 */
export function usePersonUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<PersonUpdatePasswordMutation, PersonUpdatePasswordMutationVariables>) {
        return Apollo.useMutation<PersonUpdatePasswordMutation, PersonUpdatePasswordMutationVariables>(PersonUpdatePasswordDocument, baseOptions);
      }
export type PersonUpdatePasswordMutationHookResult = ReturnType<typeof usePersonUpdatePasswordMutation>;
export type PersonUpdatePasswordMutationResult = Apollo.MutationResult<PersonUpdatePasswordMutation>;
export type PersonUpdatePasswordMutationOptions = Apollo.BaseMutationOptions<PersonUpdatePasswordMutation, PersonUpdatePasswordMutationVariables>;
export const PersonUpdateProfileDocument = gql`
    mutation personUpdateProfile($updatePersonProfileData: UpdatePersonProfileInput!) {
  personUpdateProfile(updatePersonProfileData: $updatePersonProfileData) {
    id
    email
    mobilePhone
    postal
    city
    region
    geoLocation
    timezone
    personalInfo
    metaData
  }
}
    `;
export type PersonUpdateProfileMutationFn = Apollo.MutationFunction<PersonUpdateProfileMutation, PersonUpdateProfileMutationVariables>;

/**
 * __usePersonUpdateProfileMutation__
 *
 * To run a mutation, you first call `usePersonUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePersonUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [personUpdateProfileMutation, { data, loading, error }] = usePersonUpdateProfileMutation({
 *   variables: {
 *      updatePersonProfileData: // value for 'updatePersonProfileData'
 *   },
 * });
 */
export function usePersonUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<PersonUpdateProfileMutation, PersonUpdateProfileMutationVariables>) {
        return Apollo.useMutation<PersonUpdateProfileMutation, PersonUpdateProfileMutationVariables>(PersonUpdateProfileDocument, baseOptions);
      }
export type PersonUpdateProfileMutationHookResult = ReturnType<typeof usePersonUpdateProfileMutation>;
export type PersonUpdateProfileMutationResult = Apollo.MutationResult<PersonUpdateProfileMutation>;
export type PersonUpdateProfileMutationOptions = Apollo.BaseMutationOptions<PersonUpdateProfileMutation, PersonUpdateProfileMutationVariables>;
export const PersonUpsertCitizenCardDocument = gql`
    mutation personUpsertCitizenCard($upsertCitizenCardData: UpsertCitizenCardInput!) {
  personUpsertCitizenCard(upsertCitizenCardData: $upsertCitizenCardData) {
    id
    documentNumber
    identityNumber
    fiscalNumber
    socialSecurityNumber
    beneficiaryNumber
    pan
    firstName
    lastName
    gender
    height
    fatherFirstName
    fatherLastName
    motherFirstName
    motherLastName
    birthDate
    nationality
    country
    documentType
    cardVersion
    emissionDate
    expirationDate
    emittingEntity
    requestLocation
    otherInformation
  }
}
    `;
export type PersonUpsertCitizenCardMutationFn = Apollo.MutationFunction<PersonUpsertCitizenCardMutation, PersonUpsertCitizenCardMutationVariables>;

/**
 * __usePersonUpsertCitizenCardMutation__
 *
 * To run a mutation, you first call `usePersonUpsertCitizenCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePersonUpsertCitizenCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [personUpsertCitizenCardMutation, { data, loading, error }] = usePersonUpsertCitizenCardMutation({
 *   variables: {
 *      upsertCitizenCardData: // value for 'upsertCitizenCardData'
 *   },
 * });
 */
export function usePersonUpsertCitizenCardMutation(baseOptions?: Apollo.MutationHookOptions<PersonUpsertCitizenCardMutation, PersonUpsertCitizenCardMutationVariables>) {
        return Apollo.useMutation<PersonUpsertCitizenCardMutation, PersonUpsertCitizenCardMutationVariables>(PersonUpsertCitizenCardDocument, baseOptions);
      }
export type PersonUpsertCitizenCardMutationHookResult = ReturnType<typeof usePersonUpsertCitizenCardMutation>;
export type PersonUpsertCitizenCardMutationResult = Apollo.MutationResult<PersonUpsertCitizenCardMutation>;
export type PersonUpsertCitizenCardMutationOptions = Apollo.BaseMutationOptions<PersonUpsertCitizenCardMutation, PersonUpsertCitizenCardMutationVariables>;
export const TransactionNewDocument = gql`
    mutation transactionNew($newTransactionData: NewTransactionInput!) {
  transactionNew(newTransactionData: $newTransactionData) {
    id
    transactionType
    resourceType
    assetId
    input {
      entity {
        id
        type
      }
    }
    output {
      entity {
        id
        type
      }
    }
    quantity
    currency
    location
    tags
    participant {
      id
      name
      msp
    }
    createdDate
    createdByPersonId
    metaData
    metaDataInternal
  }
}
    `;
export type TransactionNewMutationFn = Apollo.MutationFunction<TransactionNewMutation, TransactionNewMutationVariables>;

/**
 * __useTransactionNewMutation__
 *
 * To run a mutation, you first call `useTransactionNewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransactionNewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transactionNewMutation, { data, loading, error }] = useTransactionNewMutation({
 *   variables: {
 *      newTransactionData: // value for 'newTransactionData'
 *   },
 * });
 */
export function useTransactionNewMutation(baseOptions?: Apollo.MutationHookOptions<TransactionNewMutation, TransactionNewMutationVariables>) {
        return Apollo.useMutation<TransactionNewMutation, TransactionNewMutationVariables>(TransactionNewDocument, baseOptions);
      }
export type TransactionNewMutationHookResult = ReturnType<typeof useTransactionNewMutation>;
export type TransactionNewMutationResult = Apollo.MutationResult<TransactionNewMutation>;
export type TransactionNewMutationOptions = Apollo.BaseMutationOptions<TransactionNewMutation, TransactionNewMutationVariables>;
export const TransactionUpdateDocument = gql`
    mutation transactionUpdate($updateTransactionData: UpdateTransactionInput!) {
  transactionUpdate(updateTransactionData: $updateTransactionData) {
    id
    metaDataInternal
  }
}
    `;
export type TransactionUpdateMutationFn = Apollo.MutationFunction<TransactionUpdateMutation, TransactionUpdateMutationVariables>;

/**
 * __useTransactionUpdateMutation__
 *
 * To run a mutation, you first call `useTransactionUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransactionUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transactionUpdateMutation, { data, loading, error }] = useTransactionUpdateMutation({
 *   variables: {
 *      updateTransactionData: // value for 'updateTransactionData'
 *   },
 * });
 */
export function useTransactionUpdateMutation(baseOptions?: Apollo.MutationHookOptions<TransactionUpdateMutation, TransactionUpdateMutationVariables>) {
        return Apollo.useMutation<TransactionUpdateMutation, TransactionUpdateMutationVariables>(TransactionUpdateDocument, baseOptions);
      }
export type TransactionUpdateMutationHookResult = ReturnType<typeof useTransactionUpdateMutation>;
export type TransactionUpdateMutationResult = Apollo.MutationResult<TransactionUpdateMutation>;
export type TransactionUpdateMutationOptions = Apollo.BaseMutationOptions<TransactionUpdateMutation, TransactionUpdateMutationVariables>;
export const AssetByIdDocument = gql`
    query assetById($id: String!) {
  assetById(id: $id) {
    id
    name
    description
    assetType
    owner {
      entity {
        id
        type
      }
    }
    ambassadors
    location
    tags
    assetType
    owner {
      entity {
        id
        type
      }
    }
    participant {
      id
      name
    }
    createdDate
    createdByPersonId
    metaData
    metaDataInternal
  }
}
    `;

/**
 * __useAssetByIdQuery__
 *
 * To run a query within a React component, call `useAssetByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssetByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssetByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAssetByIdQuery(baseOptions?: Apollo.QueryHookOptions<AssetByIdQuery, AssetByIdQueryVariables>) {
        return Apollo.useQuery<AssetByIdQuery, AssetByIdQueryVariables>(AssetByIdDocument, baseOptions);
      }
export function useAssetByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AssetByIdQuery, AssetByIdQueryVariables>) {
          return Apollo.useLazyQuery<AssetByIdQuery, AssetByIdQueryVariables>(AssetByIdDocument, baseOptions);
        }
export type AssetByIdQueryHookResult = ReturnType<typeof useAssetByIdQuery>;
export type AssetByIdLazyQueryHookResult = ReturnType<typeof useAssetByIdLazyQuery>;
export type AssetByIdQueryResult = Apollo.QueryResult<AssetByIdQuery, AssetByIdQueryVariables>;
export const AssetComplexQueryDocument = gql`
    query assetComplexQuery($getByComplexQueryInput: GetByComplexQueryInput!, $skip: Int, $take: Int) {
  assetComplexQuery(getByComplexQueryInput: $getByComplexQueryInput, skip: $skip, take: $take) {
    id
    name
    assetType
    owner {
      entity {
        id
        type
      }
    }
    ambassadors
    location
    tags
    assetType
    owner {
      entity {
        id
        type
      }
    }
    participant {
      id
      name
    }
    createdDate
    createdByPersonId
    metaData
    metaDataInternal
  }
}
    `;

/**
 * __useAssetComplexQueryQuery__
 *
 * To run a query within a React component, call `useAssetComplexQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssetComplexQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssetComplexQueryQuery({
 *   variables: {
 *      getByComplexQueryInput: // value for 'getByComplexQueryInput'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useAssetComplexQueryQuery(baseOptions?: Apollo.QueryHookOptions<AssetComplexQueryQuery, AssetComplexQueryQueryVariables>) {
        return Apollo.useQuery<AssetComplexQueryQuery, AssetComplexQueryQueryVariables>(AssetComplexQueryDocument, baseOptions);
      }
export function useAssetComplexQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AssetComplexQueryQuery, AssetComplexQueryQueryVariables>) {
          return Apollo.useLazyQuery<AssetComplexQueryQuery, AssetComplexQueryQueryVariables>(AssetComplexQueryDocument, baseOptions);
        }
export type AssetComplexQueryQueryHookResult = ReturnType<typeof useAssetComplexQueryQuery>;
export type AssetComplexQueryLazyQueryHookResult = ReturnType<typeof useAssetComplexQueryLazyQuery>;
export type AssetComplexQueryQueryResult = Apollo.QueryResult<AssetComplexQueryQuery, AssetComplexQueryQueryVariables>;
export const AssetsDocument = gql`
    query assets($skip: Int, $take: Int) {
  assets(skip: $skip, take: $take) {
    id
    name
    assetType
    owner {
      entity {
        id
        type
      }
    }
    ambassadors
    location
    tags
    assetType
    owner {
      entity {
        id
        type
      }
    }
    participant {
      id
      name
    }
    createdDate
    createdByPersonId
    metaData
    metaDataInternal
  }
}
    `;

/**
 * __useAssetsQuery__
 *
 * To run a query within a React component, call `useAssetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssetsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useAssetsQuery(baseOptions?: Apollo.QueryHookOptions<AssetsQuery, AssetsQueryVariables>) {
        return Apollo.useQuery<AssetsQuery, AssetsQueryVariables>(AssetsDocument, baseOptions);
      }
export function useAssetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AssetsQuery, AssetsQueryVariables>) {
          return Apollo.useLazyQuery<AssetsQuery, AssetsQueryVariables>(AssetsDocument, baseOptions);
        }
export type AssetsQueryHookResult = ReturnType<typeof useAssetsQuery>;
export type AssetsLazyQueryHookResult = ReturnType<typeof useAssetsLazyQuery>;
export type AssetsQueryResult = Apollo.QueryResult<AssetsQuery, AssetsQueryVariables>;
export const CauseByIdDocument = gql`
    query causeById($id: String!) {
  causeById(id: $id) {
    id
    name
    email
    ambassadors
    startDate
    endDate
    location
    tags
    metaData
    input {
      entity {
        id
        type
        createdDate
      }
    }
    participant {
      id
      name
      msp
    }
    fundsBalance {
      debit
      credit
      balance
    }
    volunteeringHoursBalance {
      debit
      debit
      credit
      balance
    }
    goodsStock {
      id
      code
      barCode
      name
      description
      tags
      balance {
        debit
        credit
        balance
      }
      metaData
      metaDataInternal
      createdDate
      createdByPersonId
    }
    createdDate
    createdByPersonId
    metaData
    metaDataInternal
  }
}
    `;

/**
 * __useCauseByIdQuery__
 *
 * To run a query within a React component, call `useCauseByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCauseByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCauseByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCauseByIdQuery(baseOptions?: Apollo.QueryHookOptions<CauseByIdQuery, CauseByIdQueryVariables>) {
        return Apollo.useQuery<CauseByIdQuery, CauseByIdQueryVariables>(CauseByIdDocument, baseOptions);
      }
export function useCauseByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CauseByIdQuery, CauseByIdQueryVariables>) {
          return Apollo.useLazyQuery<CauseByIdQuery, CauseByIdQueryVariables>(CauseByIdDocument, baseOptions);
        }
export type CauseByIdQueryHookResult = ReturnType<typeof useCauseByIdQuery>;
export type CauseByIdLazyQueryHookResult = ReturnType<typeof useCauseByIdLazyQuery>;
export type CauseByIdQueryResult = Apollo.QueryResult<CauseByIdQuery, CauseByIdQueryVariables>;
export const CauseComplexQueryDocument = gql`
    query causeComplexQuery($getByComplexQueryInput: GetByComplexQueryInput!, $skip: Int, $take: Int) {
  causeComplexQuery(getByComplexQueryInput: $getByComplexQueryInput, skip: $skip, take: $take) {
    id
    name
    ambassadors
    startDate
    endDate
    location
    tags
    metaData
    input {
      entity {
        id
        type
        createdDate
      }
    }
    participant {
      id
      name
      msp
    }
    createdDate
    createdByPersonId
    metaData
    metaDataInternal
  }
}
    `;

/**
 * __useCauseComplexQueryQuery__
 *
 * To run a query within a React component, call `useCauseComplexQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCauseComplexQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCauseComplexQueryQuery({
 *   variables: {
 *      getByComplexQueryInput: // value for 'getByComplexQueryInput'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useCauseComplexQueryQuery(baseOptions?: Apollo.QueryHookOptions<CauseComplexQueryQuery, CauseComplexQueryQueryVariables>) {
        return Apollo.useQuery<CauseComplexQueryQuery, CauseComplexQueryQueryVariables>(CauseComplexQueryDocument, baseOptions);
      }
export function useCauseComplexQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CauseComplexQueryQuery, CauseComplexQueryQueryVariables>) {
          return Apollo.useLazyQuery<CauseComplexQueryQuery, CauseComplexQueryQueryVariables>(CauseComplexQueryDocument, baseOptions);
        }
export type CauseComplexQueryQueryHookResult = ReturnType<typeof useCauseComplexQueryQuery>;
export type CauseComplexQueryLazyQueryHookResult = ReturnType<typeof useCauseComplexQueryLazyQuery>;
export type CauseComplexQueryQueryResult = Apollo.QueryResult<CauseComplexQueryQuery, CauseComplexQueryQueryVariables>;
export const CauseOngoingDocument = gql`
    query causeOngoing($date: Float!) {
  causeOngoing(date: $date) {
    id
    name
    ambassadors
    startDate
    endDate
    location
    tags
    metaData
    input {
      entity {
        id
        type
        createdDate
      }
    }
    participant {
      id
      name
      msp
    }
    createdDate
    createdByPersonId
    metaData
    metaDataInternal
  }
}
    `;

/**
 * __useCauseOngoingQuery__
 *
 * To run a query within a React component, call `useCauseOngoingQuery` and pass it any options that fit your needs.
 * When your component renders, `useCauseOngoingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCauseOngoingQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useCauseOngoingQuery(baseOptions?: Apollo.QueryHookOptions<CauseOngoingQuery, CauseOngoingQueryVariables>) {
        return Apollo.useQuery<CauseOngoingQuery, CauseOngoingQueryVariables>(CauseOngoingDocument, baseOptions);
      }
export function useCauseOngoingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CauseOngoingQuery, CauseOngoingQueryVariables>) {
          return Apollo.useLazyQuery<CauseOngoingQuery, CauseOngoingQueryVariables>(CauseOngoingDocument, baseOptions);
        }
export type CauseOngoingQueryHookResult = ReturnType<typeof useCauseOngoingQuery>;
export type CauseOngoingLazyQueryHookResult = ReturnType<typeof useCauseOngoingLazyQuery>;
export type CauseOngoingQueryResult = Apollo.QueryResult<CauseOngoingQuery, CauseOngoingQueryVariables>;
export const CausesDocument = gql`
    query causes($skip: Int, $take: Int) {
  causes(skip: $skip, take: $take) {
    id
    name
    email
    ambassadors
    startDate
    endDate
    location
    tags
    metaData
    input {
      entity {
        id
        type
        createdDate
      }
    }
    participant {
      id
      name
      msp
    }
    fundsBalance {
      debit
      credit
      balance
    }
    volunteeringHoursBalance {
      debit
      credit
      balance
    }
    goodsStock {
      id
      code
      barCode
      name
      description
      tags
      balance {
        debit
        credit
        balance
      }
    }
    createdDate
    createdByPersonId
    metaData
    metaDataInternal
  }
}
    `;

/**
 * __useCausesQuery__
 *
 * To run a query within a React component, call `useCausesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCausesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCausesQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useCausesQuery(baseOptions?: Apollo.QueryHookOptions<CausesQuery, CausesQueryVariables>) {
        return Apollo.useQuery<CausesQuery, CausesQueryVariables>(CausesDocument, baseOptions);
      }
export function useCausesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CausesQuery, CausesQueryVariables>) {
          return Apollo.useLazyQuery<CausesQuery, CausesQueryVariables>(CausesDocument, baseOptions);
        }
export type CausesQueryHookResult = ReturnType<typeof useCausesQuery>;
export type CausesLazyQueryHookResult = ReturnType<typeof useCausesLazyQuery>;
export type CausesQueryResult = Apollo.QueryResult<CausesQuery, CausesQueryVariables>;
export const ParticipantByCodeDocument = gql`
    query participantByCode($code: String!) {
  participantByCode(code: $code) {
    id
    code
    name
    ambassadors
    msp
    participant {
      id
      name
      msp
    }
    createdDate
    createdByPersonId
    metaData
    metaDataInternal
  }
}
    `;

/**
 * __useParticipantByCodeQuery__
 *
 * To run a query within a React component, call `useParticipantByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useParticipantByCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipantByCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useParticipantByCodeQuery(baseOptions?: Apollo.QueryHookOptions<ParticipantByCodeQuery, ParticipantByCodeQueryVariables>) {
        return Apollo.useQuery<ParticipantByCodeQuery, ParticipantByCodeQueryVariables>(ParticipantByCodeDocument, baseOptions);
      }
export function useParticipantByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParticipantByCodeQuery, ParticipantByCodeQueryVariables>) {
          return Apollo.useLazyQuery<ParticipantByCodeQuery, ParticipantByCodeQueryVariables>(ParticipantByCodeDocument, baseOptions);
        }
export type ParticipantByCodeQueryHookResult = ReturnType<typeof useParticipantByCodeQuery>;
export type ParticipantByCodeLazyQueryHookResult = ReturnType<typeof useParticipantByCodeLazyQuery>;
export type ParticipantByCodeQueryResult = Apollo.QueryResult<ParticipantByCodeQuery, ParticipantByCodeQueryVariables>;
export const ParticipantByIdDocument = gql`
    query participantById($id: String!) {
  participantById(id: $id) {
    id
    name
    msp
    participant {
      id
      name
      msp
    }
    createdDate
  }
}
    `;

/**
 * __useParticipantByIdQuery__
 *
 * To run a query within a React component, call `useParticipantByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useParticipantByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipantByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useParticipantByIdQuery(baseOptions?: Apollo.QueryHookOptions<ParticipantByIdQuery, ParticipantByIdQueryVariables>) {
        return Apollo.useQuery<ParticipantByIdQuery, ParticipantByIdQueryVariables>(ParticipantByIdDocument, baseOptions);
      }
export function useParticipantByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParticipantByIdQuery, ParticipantByIdQueryVariables>) {
          return Apollo.useLazyQuery<ParticipantByIdQuery, ParticipantByIdQueryVariables>(ParticipantByIdDocument, baseOptions);
        }
export type ParticipantByIdQueryHookResult = ReturnType<typeof useParticipantByIdQuery>;
export type ParticipantByIdLazyQueryHookResult = ReturnType<typeof useParticipantByIdLazyQuery>;
export type ParticipantByIdQueryResult = Apollo.QueryResult<ParticipantByIdQuery, ParticipantByIdQueryVariables>;
export const ParticipantsDocument = gql`
    query participants($skip: Int, $take: Int) {
  participants(skip: $skip, take: $take) {
    id
    name
    email
    fiscalNumber
    ambassadors
    msp
    participant {
      id
      name
      msp
    }
    createdDate
  }
}
    `;

/**
 * __useParticipantsQuery__
 *
 * To run a query within a React component, call `useParticipantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useParticipantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipantsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useParticipantsQuery(baseOptions?: Apollo.QueryHookOptions<ParticipantsQuery, ParticipantsQueryVariables>) {
        return Apollo.useQuery<ParticipantsQuery, ParticipantsQueryVariables>(ParticipantsDocument, baseOptions);
      }
export function useParticipantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParticipantsQuery, ParticipantsQueryVariables>) {
          return Apollo.useLazyQuery<ParticipantsQuery, ParticipantsQueryVariables>(ParticipantsDocument, baseOptions);
        }
export type ParticipantsQueryHookResult = ReturnType<typeof useParticipantsQuery>;
export type ParticipantsLazyQueryHookResult = ReturnType<typeof useParticipantsLazyQuery>;
export type ParticipantsQueryResult = Apollo.QueryResult<ParticipantsQuery, ParticipantsQueryVariables>;
export const ParticipantComplexQueryDocument = gql`
    query participantComplexQuery($getByComplexQueryInput: GetByComplexQueryInput!, $skip: Int, $take: Int) {
  participantComplexQuery(getByComplexQueryInput: $getByComplexQueryInput, skip: $skip, take: $take) {
    id
    name
    ambassadors
    msp
    participant {
      id
      name
      msp
    }
    createdDate
    createdByPersonId
    metaData
    metaDataInternal
  }
}
    `;

/**
 * __useParticipantComplexQueryQuery__
 *
 * To run a query within a React component, call `useParticipantComplexQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useParticipantComplexQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipantComplexQueryQuery({
 *   variables: {
 *      getByComplexQueryInput: // value for 'getByComplexQueryInput'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useParticipantComplexQueryQuery(baseOptions?: Apollo.QueryHookOptions<ParticipantComplexQueryQuery, ParticipantComplexQueryQueryVariables>) {
        return Apollo.useQuery<ParticipantComplexQueryQuery, ParticipantComplexQueryQueryVariables>(ParticipantComplexQueryDocument, baseOptions);
      }
export function useParticipantComplexQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParticipantComplexQueryQuery, ParticipantComplexQueryQueryVariables>) {
          return Apollo.useLazyQuery<ParticipantComplexQueryQuery, ParticipantComplexQueryQueryVariables>(ParticipantComplexQueryDocument, baseOptions);
        }
export type ParticipantComplexQueryQueryHookResult = ReturnType<typeof useParticipantComplexQueryQuery>;
export type ParticipantComplexQueryLazyQueryHookResult = ReturnType<typeof useParticipantComplexQueryLazyQuery>;
export type ParticipantComplexQueryQueryResult = Apollo.QueryResult<ParticipantComplexQueryQuery, ParticipantComplexQueryQueryVariables>;
export const PersonByAttributeDocument = gql`
    query personByAttribute($getByAttributeInput: GetByAttributeInput!, $skip: Int, $take: Int) {
  personByAttribute(getByAttributeInput: $getByAttributeInput, skip: $skip, take: $take) {
    id
    username
    email
    attributes {
      id
      content
      issuedDate
      expiresDate
      expired
      certifierID
    }
    roles
    participant {
      id
      name
      msp
    }
    mobilePhone
    postal
    city
    region
    geoLocation
    timezone
    personalInfo
    profile
    firstName
    lastName
    gender
    height
    fatherFirstName
    fatherLastName
    motherFirstName
    motherLastName
    birthDate
    nationality
    country
    documentNumber
    documentType
    cardVersion
    emissionDate
    expirationDate
    emittingEntity
    identityNumber
    fiscalNumber
    socialSecurityNumber
    beneficiaryNumber
    pan
    requestLocation
    otherInformation
    registrationDate
    createdDate
  }
}
    `;

/**
 * __usePersonByAttributeQuery__
 *
 * To run a query within a React component, call `usePersonByAttributeQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonByAttributeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonByAttributeQuery({
 *   variables: {
 *      getByAttributeInput: // value for 'getByAttributeInput'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function usePersonByAttributeQuery(baseOptions?: Apollo.QueryHookOptions<PersonByAttributeQuery, PersonByAttributeQueryVariables>) {
        return Apollo.useQuery<PersonByAttributeQuery, PersonByAttributeQueryVariables>(PersonByAttributeDocument, baseOptions);
      }
export function usePersonByAttributeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonByAttributeQuery, PersonByAttributeQueryVariables>) {
          return Apollo.useLazyQuery<PersonByAttributeQuery, PersonByAttributeQueryVariables>(PersonByAttributeDocument, baseOptions);
        }
export type PersonByAttributeQueryHookResult = ReturnType<typeof usePersonByAttributeQuery>;
export type PersonByAttributeLazyQueryHookResult = ReturnType<typeof usePersonByAttributeLazyQuery>;
export type PersonByAttributeQueryResult = Apollo.QueryResult<PersonByAttributeQuery, PersonByAttributeQueryVariables>;
export const PersonByFiscalNumberDocument = gql`
    query personByFiscalNumber($fiscalNumber: String!) {
  personByFiscalNumber(fiscalNumber: $fiscalNumber) {
    id
    firstName
    lastName
    username
    fiscalNumber
    email
    documentNumber
    attributes {
      id
      content
      issuedDate
      expiresDate
      expired
      certifierID
    }
    roles
  }
}
    `;

/**
 * __usePersonByFiscalNumberQuery__
 *
 * To run a query within a React component, call `usePersonByFiscalNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonByFiscalNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonByFiscalNumberQuery({
 *   variables: {
 *      fiscalNumber: // value for 'fiscalNumber'
 *   },
 * });
 */
export function usePersonByFiscalNumberQuery(baseOptions?: Apollo.QueryHookOptions<PersonByFiscalNumberQuery, PersonByFiscalNumberQueryVariables>) {
        return Apollo.useQuery<PersonByFiscalNumberQuery, PersonByFiscalNumberQueryVariables>(PersonByFiscalNumberDocument, baseOptions);
      }
export function usePersonByFiscalNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonByFiscalNumberQuery, PersonByFiscalNumberQueryVariables>) {
          return Apollo.useLazyQuery<PersonByFiscalNumberQuery, PersonByFiscalNumberQueryVariables>(PersonByFiscalNumberDocument, baseOptions);
        }
export type PersonByFiscalNumberQueryHookResult = ReturnType<typeof usePersonByFiscalNumberQuery>;
export type PersonByFiscalNumberLazyQueryHookResult = ReturnType<typeof usePersonByFiscalNumberLazyQuery>;
export type PersonByFiscalNumberQueryResult = Apollo.QueryResult<PersonByFiscalNumberQuery, PersonByFiscalNumberQueryVariables>;
export const PersonByIdDocument = gql`
    query personById($id: String!) {
  personById(id: $id) {
    id
    username
    email
    attributes {
      id
      content
      issuedDate
      expiresDate
      expired
      certifierID
    }
    roles
    participant {
      id
      name
      msp
    }
    mobilePhone
    postal
    city
    region
    geoLocation
    timezone
    personalInfo
    profile
    firstName
    lastName
    gender
    height
    fatherFirstName
    fatherLastName
    motherFirstName
    motherLastName
    birthDate
    nationality
    country
    documentNumber
    documentType
    cardVersion
    emissionDate
    expirationDate
    emittingEntity
    identityNumber
    fiscalNumber
    socialSecurityNumber
    beneficiaryNumber
    pan
    requestLocation
    otherInformation
    registrationDate
    createdDate
  }
}
    `;

/**
 * __usePersonByIdQuery__
 *
 * To run a query within a React component, call `usePersonByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePersonByIdQuery(baseOptions?: Apollo.QueryHookOptions<PersonByIdQuery, PersonByIdQueryVariables>) {
        return Apollo.useQuery<PersonByIdQuery, PersonByIdQueryVariables>(PersonByIdDocument, baseOptions);
      }
export function usePersonByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonByIdQuery, PersonByIdQueryVariables>) {
          return Apollo.useLazyQuery<PersonByIdQuery, PersonByIdQueryVariables>(PersonByIdDocument, baseOptions);
        }
export type PersonByIdQueryHookResult = ReturnType<typeof usePersonByIdQuery>;
export type PersonByIdLazyQueryHookResult = ReturnType<typeof usePersonByIdLazyQuery>;
export type PersonByIdQueryResult = Apollo.QueryResult<PersonByIdQuery, PersonByIdQueryVariables>;
export const PersonByUsernameDocument = gql`
    query personByUsername($username: String!) {
  personByUsername(username: $username) {
    id
    firstName
    lastName
    username
    email
    attributes {
      id
      content
      issuedDate
      expiresDate
      expired
      certifierID
    }
    roles
    participant {
      id
      name
      msp
    }
    createdDate
  }
}
    `;

/**
 * __usePersonByUsernameQuery__
 *
 * To run a query within a React component, call `usePersonByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function usePersonByUsernameQuery(baseOptions?: Apollo.QueryHookOptions<PersonByUsernameQuery, PersonByUsernameQueryVariables>) {
        return Apollo.useQuery<PersonByUsernameQuery, PersonByUsernameQueryVariables>(PersonByUsernameDocument, baseOptions);
      }
export function usePersonByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonByUsernameQuery, PersonByUsernameQueryVariables>) {
          return Apollo.useLazyQuery<PersonByUsernameQuery, PersonByUsernameQueryVariables>(PersonByUsernameDocument, baseOptions);
        }
export type PersonByUsernameQueryHookResult = ReturnType<typeof usePersonByUsernameQuery>;
export type PersonByUsernameLazyQueryHookResult = ReturnType<typeof usePersonByUsernameLazyQuery>;
export type PersonByUsernameQueryResult = Apollo.QueryResult<PersonByUsernameQuery, PersonByUsernameQueryVariables>;
export const PersonComplexQueryDocument = gql`
    query personComplexQuery($getByComplexQueryInput: GetByComplexQueryInput!, $skip: Int, $take: Int) {
  personComplexQuery(getByComplexQueryInput: $getByComplexQueryInput, skip: $skip, take: $take) {
    id
    firstName
    lastName
    username
    fiscalNumber
    email
    attributes {
      id
      content
      issuedDate
      expiresDate
      expired
      certifierID
    }
    roles
    createdDate
    metaData
    metaDataInternal
  }
}
    `;

/**
 * __usePersonComplexQueryQuery__
 *
 * To run a query within a React component, call `usePersonComplexQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonComplexQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonComplexQueryQuery({
 *   variables: {
 *      getByComplexQueryInput: // value for 'getByComplexQueryInput'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function usePersonComplexQueryQuery(baseOptions?: Apollo.QueryHookOptions<PersonComplexQueryQuery, PersonComplexQueryQueryVariables>) {
        return Apollo.useQuery<PersonComplexQueryQuery, PersonComplexQueryQueryVariables>(PersonComplexQueryDocument, baseOptions);
      }
export function usePersonComplexQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonComplexQueryQuery, PersonComplexQueryQueryVariables>) {
          return Apollo.useLazyQuery<PersonComplexQueryQuery, PersonComplexQueryQueryVariables>(PersonComplexQueryDocument, baseOptions);
        }
export type PersonComplexQueryQueryHookResult = ReturnType<typeof usePersonComplexQueryQuery>;
export type PersonComplexQueryLazyQueryHookResult = ReturnType<typeof usePersonComplexQueryLazyQuery>;
export type PersonComplexQueryQueryResult = Apollo.QueryResult<PersonComplexQueryQuery, PersonComplexQueryQueryVariables>;
export const PersonProfileDocument = gql`
    query personProfile {
  personProfile {
    id
    username
    email
    attributes {
      id
      content
      issuedDate
      expiresDate
      expired
      certifierID
    }
    roles
    participant {
      id
      name
      msp
    }
    mobilePhone
    postal
    city
    region
    geoLocation
    timezone
    personalInfo
    profile
    firstName
    lastName
    gender
    height
    fatherFirstName
    fatherLastName
    motherFirstName
    motherLastName
    birthDate
    nationality
    country
    documentNumber
    documentType
    cardVersion
    emissionDate
    expirationDate
    emittingEntity
    identityNumber
    fiscalNumber
    socialSecurityNumber
    beneficiaryNumber
    pan
    requestLocation
    otherInformation
    registrationDate
    createdDate
  }
}
    `;

/**
 * __usePersonProfileQuery__
 *
 * To run a query within a React component, call `usePersonProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function usePersonProfileQuery(baseOptions?: Apollo.QueryHookOptions<PersonProfileQuery, PersonProfileQueryVariables>) {
        return Apollo.useQuery<PersonProfileQuery, PersonProfileQueryVariables>(PersonProfileDocument, baseOptions);
      }
export function usePersonProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonProfileQuery, PersonProfileQueryVariables>) {
          return Apollo.useLazyQuery<PersonProfileQuery, PersonProfileQueryVariables>(PersonProfileDocument, baseOptions);
        }
export type PersonProfileQueryHookResult = ReturnType<typeof usePersonProfileQuery>;
export type PersonProfileLazyQueryHookResult = ReturnType<typeof usePersonProfileLazyQuery>;
export type PersonProfileQueryResult = Apollo.QueryResult<PersonProfileQuery, PersonProfileQueryVariables>;
export const PersonsDocument = gql`
    query persons($skip: Int, $take: Int) {
  persons(skip: $skip, take: $take) {
    id
    username
    email
    attributes {
      id
      content
      issuedDate
      expiresDate
      expired
      certifierID
    }
    roles
    participant {
      id
      code
      name
      email
      fiscalNumber
      ambassadors
      fundsBalance {
        debit
        credit
        balance
      }
      volunteeringHoursBalance {
        debit
        credit
        balance
      }
      name
      msp
      createdDate
    }
    mobilePhone
    postal
    city
    region
    geoLocation
    timezone
    personalInfo
    profile
    fundsBalance {
      debit
      credit
      balance
    }
    volunteeringHoursBalance {
      debit
      credit
      balance
    }
    goodsStock {
      id
      code
      barCode
      name
      description
      tags
      balance {
        debit
        credit
        balance
      }
      metaData
      metaDataInternal
      createdDate
      createdByPersonId
    }
    firstName
    lastName
    gender
    height
    fatherFirstName
    fatherLastName
    motherFirstName
    motherLastName
    birthDate
    nationality
    country
    documentNumber
    documentType
    cardVersion
    emissionDate
    expirationDate
    emittingEntity
    identityNumber
    fiscalNumber
    socialSecurityNumber
    beneficiaryNumber
    pan
    requestLocation
    otherInformation
    registrationDate
    createdDate
  }
}
    `;

/**
 * __usePersonsQuery__
 *
 * To run a query within a React component, call `usePersonsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function usePersonsQuery(baseOptions?: Apollo.QueryHookOptions<PersonsQuery, PersonsQueryVariables>) {
        return Apollo.useQuery<PersonsQuery, PersonsQueryVariables>(PersonsDocument, baseOptions);
      }
export function usePersonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonsQuery, PersonsQueryVariables>) {
          return Apollo.useLazyQuery<PersonsQuery, PersonsQueryVariables>(PersonsDocument, baseOptions);
        }
export type PersonsQueryHookResult = ReturnType<typeof usePersonsQuery>;
export type PersonsLazyQueryHookResult = ReturnType<typeof usePersonsLazyQuery>;
export type PersonsQueryResult = Apollo.QueryResult<PersonsQuery, PersonsQueryVariables>;
export const ReactForceDataDocument = gql`
    query reactForceData($skip: Int, $take: Int) {
  reactForceData(skip: $skip, take: $take) {
    nodes {
      id
      label
      desc
      nodeVal
      color
      autoColorBy
      group
    }
    links {
      source
      target
      label
      desc
      color
      autoColorBy
      group
    }
  }
}
    `;

/**
 * __useReactForceDataQuery__
 *
 * To run a query within a React component, call `useReactForceDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useReactForceDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReactForceDataQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useReactForceDataQuery(baseOptions?: Apollo.QueryHookOptions<ReactForceDataQuery, ReactForceDataQueryVariables>) {
        return Apollo.useQuery<ReactForceDataQuery, ReactForceDataQueryVariables>(ReactForceDataDocument, baseOptions);
      }
export function useReactForceDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReactForceDataQuery, ReactForceDataQueryVariables>) {
          return Apollo.useLazyQuery<ReactForceDataQuery, ReactForceDataQueryVariables>(ReactForceDataDocument, baseOptions);
        }
export type ReactForceDataQueryHookResult = ReturnType<typeof useReactForceDataQuery>;
export type ReactForceDataLazyQueryHookResult = ReturnType<typeof useReactForceDataLazyQuery>;
export type ReactForceDataQueryResult = Apollo.QueryResult<ReactForceDataQuery, ReactForceDataQueryVariables>;
export const TransactionsByIdDocument = gql`
    query transactionsById($id: String!) {
  transactionById(id: $id) {
    id
    transactionType
    resourceType
    assetId
    input {
      entity {
        id
        type
      }
    }
    output {
      entity {
        id
        type
      }
    }
    quantity
    currency
    goods {
      id
      code
      barCode
      name
      description
      tags
      balance {
        debit
        credit
        balance
      }
      metaData
      metaDataInternal
      createdDate
      createdByPersonId
    }
    location
    tags
    participant {
      id
      name
      msp
    }
    createdDate
    createdByPersonId
    metaData
    metaDataInternal
  }
}
    `;

/**
 * __useTransactionsByIdQuery__
 *
 * To run a query within a React component, call `useTransactionsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTransactionsByIdQuery(baseOptions?: Apollo.QueryHookOptions<TransactionsByIdQuery, TransactionsByIdQueryVariables>) {
        return Apollo.useQuery<TransactionsByIdQuery, TransactionsByIdQueryVariables>(TransactionsByIdDocument, baseOptions);
      }
export function useTransactionsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsByIdQuery, TransactionsByIdQueryVariables>) {
          return Apollo.useLazyQuery<TransactionsByIdQuery, TransactionsByIdQueryVariables>(TransactionsByIdDocument, baseOptions);
        }
export type TransactionsByIdQueryHookResult = ReturnType<typeof useTransactionsByIdQuery>;
export type TransactionsByIdLazyQueryHookResult = ReturnType<typeof useTransactionsByIdLazyQuery>;
export type TransactionsByIdQueryResult = Apollo.QueryResult<TransactionsByIdQuery, TransactionsByIdQueryVariables>;
export const TransactionComplexQueryDocument = gql`
    query transactionComplexQuery($getByComplexQueryInput: GetByComplexQueryInput!, $skip: Int, $take: Int) {
  transactionComplexQuery(getByComplexQueryInput: $getByComplexQueryInput, skip: $skip, take: $take) {
    id
    transactionType
    resourceType
    assetId
    input {
      entity {
        id
        type
      }
    }
    output {
      entity {
        id
        type
      }
    }
    quantity
    currency
    location
    tags
    participant {
      id
      name
      msp
    }
    createdDate
    createdByPersonId
    metaData
    metaDataInternal
  }
}
    `;

/**
 * __useTransactionComplexQueryQuery__
 *
 * To run a query within a React component, call `useTransactionComplexQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionComplexQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionComplexQueryQuery({
 *   variables: {
 *      getByComplexQueryInput: // value for 'getByComplexQueryInput'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useTransactionComplexQueryQuery(baseOptions?: Apollo.QueryHookOptions<TransactionComplexQueryQuery, TransactionComplexQueryQueryVariables>) {
        return Apollo.useQuery<TransactionComplexQueryQuery, TransactionComplexQueryQueryVariables>(TransactionComplexQueryDocument, baseOptions);
      }
export function useTransactionComplexQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionComplexQueryQuery, TransactionComplexQueryQueryVariables>) {
          return Apollo.useLazyQuery<TransactionComplexQueryQuery, TransactionComplexQueryQueryVariables>(TransactionComplexQueryDocument, baseOptions);
        }
export type TransactionComplexQueryQueryHookResult = ReturnType<typeof useTransactionComplexQueryQuery>;
export type TransactionComplexQueryLazyQueryHookResult = ReturnType<typeof useTransactionComplexQueryLazyQuery>;
export type TransactionComplexQueryQueryResult = Apollo.QueryResult<TransactionComplexQueryQuery, TransactionComplexQueryQueryVariables>;
export const TransactionsDocument = gql`
    query transactions($skip: Int, $take: Int) {
  transactions(skip: $skip, take: $take) {
    id
    transactionType
    resourceType
    assetId
    input {
      entity {
        id
        type
      }
    }
    output {
      entity {
        id
        type
      }
    }
    quantity
    currency
    location
    tags
    participant {
      id
      name
      msp
    }
    createdDate
    createdByPersonId
    metaData
    metaDataInternal
  }
}
    `;

/**
 * __useTransactionsQuery__
 *
 * To run a query within a React component, call `useTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
        return Apollo.useQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, baseOptions);
      }
export function useTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
          return Apollo.useLazyQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, baseOptions);
        }
export type TransactionsQueryHookResult = ReturnType<typeof useTransactionsQuery>;
export type TransactionsLazyQueryHookResult = ReturnType<typeof useTransactionsLazyQuery>;
export type TransactionsQueryResult = Apollo.QueryResult<TransactionsQuery, TransactionsQueryVariables>;
export const AssetAddedDocument = gql`
    subscription assetAdded {
  assetAdded {
    id
    name
    description
    assetType
    ambassadors
    owner {
      entity {
        id
        type
      }
    }
    location
    tags
    metaData
  }
}
    `;

/**
 * __useAssetAddedSubscription__
 *
 * To run a query within a React component, call `useAssetAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAssetAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssetAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useAssetAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<AssetAddedSubscription, AssetAddedSubscriptionVariables>) {
        return Apollo.useSubscription<AssetAddedSubscription, AssetAddedSubscriptionVariables>(AssetAddedDocument, baseOptions);
      }
export type AssetAddedSubscriptionHookResult = ReturnType<typeof useAssetAddedSubscription>;
export type AssetAddedSubscriptionResult = Apollo.SubscriptionResult<AssetAddedSubscription>;
export const CauseAddedDocument = gql`
    subscription causeAdded {
  causeAdded {
    id
    name
    ambassadors
    startDate
    endDate
    location
    tags
    metaData
    input {
      entity {
        id
      }
    }
    createdDate
  }
}
    `;

/**
 * __useCauseAddedSubscription__
 *
 * To run a query within a React component, call `useCauseAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCauseAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCauseAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useCauseAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<CauseAddedSubscription, CauseAddedSubscriptionVariables>) {
        return Apollo.useSubscription<CauseAddedSubscription, CauseAddedSubscriptionVariables>(CauseAddedDocument, baseOptions);
      }
export type CauseAddedSubscriptionHookResult = ReturnType<typeof useCauseAddedSubscription>;
export type CauseAddedSubscriptionResult = Apollo.SubscriptionResult<CauseAddedSubscription>;
export const ParticipantAddedDocument = gql`
    subscription participantAdded {
  participantAdded {
    id
    name
    msp
  }
}
    `;

/**
 * __useParticipantAddedSubscription__
 *
 * To run a query within a React component, call `useParticipantAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useParticipantAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipantAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useParticipantAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ParticipantAddedSubscription, ParticipantAddedSubscriptionVariables>) {
        return Apollo.useSubscription<ParticipantAddedSubscription, ParticipantAddedSubscriptionVariables>(ParticipantAddedDocument, baseOptions);
      }
export type ParticipantAddedSubscriptionHookResult = ReturnType<typeof useParticipantAddedSubscription>;
export type ParticipantAddedSubscriptionResult = Apollo.SubscriptionResult<ParticipantAddedSubscription>;
export const PersonAddedDocument = gql`
    subscription personAdded {
  personAdded {
    id
    firstName
    lastName
    username
    email
    attributes {
      id
      content
      issuedDate
      expiresDate
      expired
      certifierID
    }
    roles
    participant {
      id
      name
      msp
    }
  }
}
    `;

/**
 * __usePersonAddedSubscription__
 *
 * To run a query within a React component, call `usePersonAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePersonAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePersonAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PersonAddedSubscription, PersonAddedSubscriptionVariables>) {
        return Apollo.useSubscription<PersonAddedSubscription, PersonAddedSubscriptionVariables>(PersonAddedDocument, baseOptions);
      }
export type PersonAddedSubscriptionHookResult = ReturnType<typeof usePersonAddedSubscription>;
export type PersonAddedSubscriptionResult = Apollo.SubscriptionResult<PersonAddedSubscription>;
export const PersonLoggedDocument = gql`
    subscription personLogged {
  personLogged
}
    `;

/**
 * __usePersonLoggedSubscription__
 *
 * To run a query within a React component, call `usePersonLoggedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePersonLoggedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonLoggedSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePersonLoggedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PersonLoggedSubscription, PersonLoggedSubscriptionVariables>) {
        return Apollo.useSubscription<PersonLoggedSubscription, PersonLoggedSubscriptionVariables>(PersonLoggedDocument, baseOptions);
      }
export type PersonLoggedSubscriptionHookResult = ReturnType<typeof usePersonLoggedSubscription>;
export type PersonLoggedSubscriptionResult = Apollo.SubscriptionResult<PersonLoggedSubscription>;
export const TransactionAddedDocument = gql`
    subscription transactionAdded {
  transactionAdded {
    id
    transactionType
    resourceType
    input {
      entity {
        id
        type
        createdDate
      }
    }
    output {
      entity {
        id
        type
        createdDate
      }
    }
    quantity
    currency
    location
    tags
    metaData
    metaDataInternal
    participant {
      id
      name
      msp
    }
    createdDate
  }
}
    `;

/**
 * __useTransactionAddedSubscription__
 *
 * To run a query within a React component, call `useTransactionAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTransactionAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTransactionAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TransactionAddedSubscription, TransactionAddedSubscriptionVariables>) {
        return Apollo.useSubscription<TransactionAddedSubscription, TransactionAddedSubscriptionVariables>(TransactionAddedDocument, baseOptions);
      }
export type TransactionAddedSubscriptionHookResult = ReturnType<typeof useTransactionAddedSubscription>;
export type TransactionAddedSubscriptionResult = Apollo.SubscriptionResult<TransactionAddedSubscription>;