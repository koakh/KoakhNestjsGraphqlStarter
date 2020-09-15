import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

/**
 * this works to convert convector dates stored in 'epoch unix time' to Date,
 * if we want default format we must revert <Date, number>
 */

@Scalar('Date', type => Date)
export default class DateScalar implements CustomScalar<Date, number> {
  description = 'Date custom scalar type';

  parseValue(value: Date): number {
    // value from the client
    return new Date(value).getTime();
  }

  serialize(value: number): Date {
    // value sent to the client
    return new Date(value);
  }

  parseLiteral(ast: any): number {
    if (ast.kind === Kind.INT) {
      return ast.value.getTime();
    }
    return null;
  }

}
