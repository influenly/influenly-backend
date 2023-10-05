import { AuthDecoratorInput } from '../interfaces/auth-decorator-input.interface';
export declare function Auth(input?: AuthDecoratorInput): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
