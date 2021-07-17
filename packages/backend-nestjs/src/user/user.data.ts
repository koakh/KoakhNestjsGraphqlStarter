import { NotFoundException } from "@nestjs/common";
import { CurrentUserPayload } from "../auth/interfaces";
import { UserData } from "./interfaces";
import { User } from "./object-types";
import { constants as c } from "./user.constants";
import { isAdmin } from "./utils";
export class UserInMemory {
  data: User[];
  constructor() {
    this.data = new Array<User>();
    userData.forEach((e: User) => {
      this.data.push(e);
    })
  }

  // pass a function predicate to filter data
  create(user: User, currentUser: CurrentUserPayload): User {
    this.data.push(user);
    // return created data as double check
    return this.find((e: User) => user.id === e.id, currentUser);
  }

  update(id: string, updateData: User, currentUser: CurrentUserPayload) {
    this.data.forEach((user: User) => {
      if (user.id === id) {
        const keys = Object.keys(updateData);
        keys.forEach(key => {
          if (key != 'id') {
            user[key] = updateData[key];
          }
        });
      };
    });
  };

  private getCurrentUserData(currentUser: CurrentUserPayload): User[] {
    return (isAdmin(currentUser.roles))
      ? this.data
      : this.data.filter((e: UserData) => e.createdBy === currentUser.userId);
  }

  getPaginated(data: User[], limit: number, offset: number): User[] {
    const result: User[] = []
    for (let i = 0; i <= data.length - 1; i++) {
      if (i >= offset) {
        result.push(data[i]);
      }
      if (limit && result.length === limit) {
        break;
      }
    }
    return result;
  }

  // pass a function predicate to filter data
  find(predicateFn: { (e: UserData): boolean }, currentUser: CurrentUserPayload): User {
    const currentUserData = this.getCurrentUserData(currentUser);
    return currentUserData.find((e: UserData) => predicateFn(e));
  }

  // pass a function predicate to filter data
  delete(id: string, currentUser: CurrentUserPayload): { id: string } {
    const currentUserData = this.getCurrentUserData(currentUser);
    // check that delete record belongs to user and throw if not
    const data: User[] = currentUserData.filter((e: UserData) => (e: User) => e.id != id);
    if (data.length === 0) {
      throw new NotFoundException();
    }
    // prepare clone and remove
    const clone = this.data.slice();
    this.data = clone.filter((e: User) => e.id != id);
    return { id };
  }

  // pass a function predicate to filter data
  findAll(skip: number, take: number, currentUser: CurrentUserPayload): User[] {
    const currentUserData = this.getCurrentUserData(currentUser);
    return this.getPaginated(currentUserData, take, skip);
  }

  // pass a function predicate to filter data
  filter(predicateFn: { (e: UserData): boolean }, currentUser: CurrentUserPayload, skip?: number, take?: number): User[] {
    const currentUserData = this.getCurrentUserData(currentUser);
    const data: User[] = currentUserData.filter((e: UserData) => predicateFn(e));
    return (skip > 0 && take > 0)
      ? data.splice(skip, take)
      : data;
  }
}

// https://www.mockaroo.com/
// https://bcrypt-generator.com/
const userData: UserData[] = [{
  ...c.adminUser,
}, {
  id: '520c2eb5-e83b-4ef5-a343-85756bcce149',
  username: 'johndoe',
  password: '$2b$10$U9AVUdkRnFsrMjPg/XyTeOWmF.gu73gd1hJGR1s1OnKTshjJYdGpW',
  firstName: 'Katinka',
  lastName: 'Trett',
  email: 'ktrett1@livejournal.com',
  roles: ['ROLE_USER'],
  createdDate: 1597444307,
  createdBy: c.johnDoeId,
  metaData: {
    key: 'value'
  },
}, {
  id: 'fa525f32-b6b7-40b5-8d09-b638d00ded3b',
  username: 'sstert2',
  password: 'QFYrO4E1jC',
  firstName: 'Sonny',
  lastName: 'Stert',
  email: 'sstert2@ask.com',
  roles: ['ROLE_USER'],
  createdDate: 1597444307,
  createdBy: c.johnDoeId,
  metaData: null
}, {
  id: '136c8e64-b5b2-4606-b845-f9dc26f3fb28',
  username: 'gnatte3',
  password: 'mjjZNjHv3H',
  firstName: 'Gram',
  lastName: 'Natte',
  email: 'gnatte3@i2i.jp',
  roles: ['ROLE_USER'],
  createdDate: 1597444307,
  createdBy: c.adminId,
  metaData: null,
}, {
  id: '0da9413f-ba84-4b9c-9729-37daa78de2d9',
  username: 'zespinheira4',
  password: '5dorGXixK7',
  firstName: 'Zed',
  lastName: 'Espinheira',
  email: 'zespinheira4@bandcamp.com',
  roles: ['ROLE_USER'],
  createdDate: 1597444307,
  createdBy: c.adminId,
  metaData: null,

}, {
  id: 'dffbd368-8ea1-484c-96e7-2aaf2595a14d',
  username: 'ejessope5',
  password: 'fjzgiOPlT4sZ',
  firstName: 'Elfrida',
  lastName: 'Jessope',
  email: 'ejessope5@plala.or.jp',
  roles: ['ROLE_USER'],
  createdDate: 1597444307,
  createdBy: c.adminId,
  metaData: null
}, {
  id: 'b68d77c6-2e0c-4d8b-991a-ab3154616625',
  username: 'wmewrcik6',
  password: 'UCAZ4rst',
  firstName: 'Willow',
  lastName: 'Mewrcik',
  email: 'wmewrcik6@elegantthemes.com',
  roles: ['ROLE_USER'],
  createdDate: 1597444307,
  createdBy: c.adminId,
  metaData: null
}, {
  id: 'e25f2e23-fb96-4e36-8d7a-527a04a6f21a',
  username: 'bpersey7',
  password: '5j370ubKlJ4l',
  firstName: 'Brittni',
  lastName: 'Persey',
  email: 'bpersey7@paypal.com',
  roles: ['ROLE_USER'],
  createdDate: 1597444307,
  createdBy: c.johnDoeId,
  metaData: null
}, {
  id: '15566d70-2cc6-4d01-a005-1783e3333153',
  username: 'kbertholin8',
  password: '4UUgZBMWuj',
  firstName: 'Keely',
  lastName: 'Bertholin',
  email: 'kbertholin8@cbc.ca',
  roles: ['ROLE_USER'],
  createdDate: 1597444307,
  createdBy: c.adminId,
  metaData: null
}, {
  id: 'd9c0ec8c-3f30-45dc-9c9e-0535855eebb7',
  username: 'aslater9',
  password: 'GWqYPW7',
  firstName: 'Addy',
  lastName: 'Slater',
  email: 'aslater9@altervista.org',
  roles: ['ROLE_USER'],
  createdDate: 1597444307,
  createdBy: c.adminId,
  metaData: null
}, {
  id: '2ad49b88-822b-4764-ae58-54fd4f487faf',
  username: 'olarkinsa',
  password: 'crQymDaIax',
  firstName: 'Orbadiah',
  lastName: 'Larkins',
  email: 'olarkinsa@prlog.org',
  roles: ['ROLE_USER'],
  createdDate: 1597444307,
  createdBy: c.adminId,
  metaData: null
}, {
  id: 'b4b9df50-a68d-4754-8006-fdac47bd6ff4',
  username: 'ldixieb',
  password: 'ufm8uSNpQym',
  firstName: 'Lidia',
  lastName: 'Dixie',
  email: 'ldixieb@eventbrite.com',
  roles: ['ROLE_USER'],
  createdDate: 1597444307,
  createdBy: c.johnDoeId,
  metaData: null
}, {
  id: 'f6970851-795c-4f8c-85b1-3734faebc13b',
  username: 'aludvigsenc',
  password: 'Ba9SjsV',
  firstName: 'Adelice',
  lastName: 'Ludvigsen',
  email: 'aludvigsenc@cyberchimps.com',
  roles: ['ROLE_USER'],
  createdDate: 1597444307,
  createdBy: c.adminId,
  metaData: null
}, {
  id: 'c6d10ac0-5529-41c1-865e-e01713cee884',
  username: 'probardd',
  password: 'o982PUSpRS',
  firstName: 'Peter',
  lastName: 'Robard',
  email: 'probardd@devhub.com',
  roles: ['ROLE_USER'],
  createdDate: 1597444307,
  createdBy: c.adminId,
  metaData: null
}, {
  id: '5ea39b45-0efc-4754-8bcc-6094f5ed412f',
  username: 'cspreadburye',
  password: 'HlAkSFev3',
  firstName: 'Chloette',
  lastName: 'Spreadbury',
  email: 'cspreadburye@xinhuanet.com',
  roles: ['ROLE_USER'],
  createdDate: 1597444307,
  createdBy: c.adminId,
  metaData: null
}, {
  id: 'f81c4c20-246a-4519-9b7c-6c685ceb66df',
  username: 'vheavensf',
  password: 'fX4OX9t',
  firstName: 'Vincenty',
  lastName: 'Heavens',
  email: 'vheavensf@nbcnews.com',
  roles: ['ROLE_USER'],
  createdDate: 1597444307,
  createdBy: c.adminId,
  metaData: null
}, {
  id: '7f2ed332-a7ca-4c23-84e6-d341e761c73c',
  username: 'roquing',
  password: 'g7TUBIr',
  firstName: 'Rae',
  lastName: 'O\'Quin',
  email: 'roquing@uiuc.edu',
  roles: ['ROLE_USER'],
  createdDate: 1597444307,
  createdBy: c.johnDoeId,
  metaData: null
}, {
  id: '3d016ad5-a407-44ea-8eb4-f034fd1c3930',
  username: 'lculloteyh',
  password: 'HQwX26n9D',
  firstName: 'Louisa',
  lastName: 'Cullotey',
  email: 'lculloteyh@jimdo.com',
  roles: ['ROLE_USER'],
  createdDate: 1597444307,
  createdBy: c.johnDoeId,
  metaData: null
}
  /*
  , {
    id: '3d190a69-a282-4d1f-a9eb-fc49ddfbf492',
    username: 'nslorai',
    password: 'JZ4uI1APo',
    firstName: 'Nathaniel',
    lastName: 'Slora',
    email: 'nslorai@instagram.com',
    roles: ['ROLE_USER'],
    createdDate: 1597444307,
    createdBy: c.adminId,
    metaData: null
  }, {
    id: '5c36f169-13d6-4805-bc70-f46ea430dc16',
    username: 'fblestj',
    password: 'DouWFO4l6N',
    firstName: 'Ferdinand',
    lastName: 'Blest',
    email: 'fblestj@ask.com',
    roles: ['ROLE_USER'],
    createdDate: 1597444307,
    createdBy: c.johnDoeId,
    metaData: null
  }, {
    id: 'b01e9b28-ce12-48d9-8bb2-c9c81a45ce2b',
    username: 'ascroxtonk',
    password: 'yawVDG',
    firstName: 'Ardella',
    lastName: 'Scroxton',
    email: 'ascroxtonk@scientificamerican.com',
    roles: ['ROLE_USER'],
    createdDate: 1597444307,
    createdBy: c.johnDoeId,
    metaData: null
  }, {
    id: 'ce76d275-d786-4c51-8598-3ff42f8f4c1c',
    username: 'ttuerl',
    password: 'uZCGxWmTtU',
    firstName: 'Thelma',
    lastName: 'Tuer',
    email: 'ttuerl@tripod.com',
    roles: ['ROLE_USER'],
    createdDate: 1597444307,
    createdBy: c.adminId,
    metaData: null
  }, {
    id: '6ae5d64d-346c-4e6b-a4e5-4d69c03e8337',
    username: 'openberthym',
    password: 'z0EhLT1x',
    firstName: 'Oran',
    lastName: 'Penberthy',
    email: 'openberthym@sitemeter.com',
    roles: ['ROLE_USER'],
    createdDate: 1597444307,
    createdBy: c.johnDoeId,
    metaData: null
  }, {
    id: 'a46cbc4a-25b3-4d70-a3f0-939301626a7c',
    username: 'mbrimleyn',
    password: 'MRVQByYB5D',
    firstName: 'Monty',
    lastName: 'Brimley',
    email: 'mbrimleyn@exblog.jp',
    roles: ['ROLE_USER'],
    createdDate: 1597444307,
    createdBy: c.adminId,
    metaData: null
  }, {
    id: 'a8e63b4d-9ffc-4b35-b416-669eb669f0ae',
    username: 'agrimshawo',
    password: 'e98EiJgC',
    firstName: 'Alyosha',
    lastName: 'Grimshaw',
    email: 'agrimshawo@cbc.ca',
    roles: ['ROLE_USER'],
    createdDate: 1597444307,
    createdBy: c.adminId,
    metaData: null
  }, {
    id: 'acc16671-5e9d-4cc7-8856-09771dec93fe',
    username: 'rjohnceyp',
    password: 'KcJf9M',
    firstName: 'Randal',
    lastName: 'Johncey',
    email: 'rjohnceyp@skyrock.com',
    roles: ['ROLE_USER'],
    createdDate: 1597444307,
    createdBy: c.johnDoeId,
    metaData: null
  }, {
    id: '71c2b5e8-d6f5-4b34-b85d-99055b8cac8d',
    username: 'drafteryq',
    password: 'n9POmazh',
    firstName: 'Dre',
    lastName: 'Raftery',
    email: 'drafteryq@google.ca',
    roles: ['ROLE_USER'],
    createdDate: 1597444307,
    createdBy: c.johnDoeId,
    metaData: null
  }, {
    id: '9e6224af-2ded-4d77-9eb8-4713d4d5155c',
    username: 'bcockshotr',
    password: 'wxPgPkyH',
    firstName: 'Bradan',
    lastName: 'Cockshot',
    email: 'bcockshotr@163.com',
    roles: ['ROLE_USER'],
    createdDate: 1597444307,
    createdBy: c.johnDoeId,
    metaData: null
  }
  */
];