import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Advertiser, Creator } from 'src/entities';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

// export class JwtStrategy extends PassportStrategy(Strategy) {
//   async validate(payload: IJwtPayload): Promise<Creator | Advertiser> {

//     const { email } = payload;

//     c

//     return;
//   }
// }
