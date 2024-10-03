"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(newUser) {
        const userAlreadyRegistered = await this.findByUserName(newUser.username);
        if (userAlreadyRegistered) {
            throw new common_1.ConflictException(`User '${newUser.username}' already registered`);
        }
        const dbUser = new user_entity_1.UserEntity();
        dbUser.name = newUser.name;
        dbUser.username = newUser.username;
        dbUser.passwordHash = (0, bcrypt_1.hashSync)(newUser.password, 10);
        const { id, username, name } = await this.usersRepository.save(dbUser);
        return { id, username, name };
    }
    async findByUserName(username) {
        const userFound = await this.usersRepository.findOne({
            where: { username },
        });
        if (!userFound) {
            return null;
        }
        return {
            id: userFound.id,
            name: userFound.name,
            username: userFound.username,
            password: userFound.passwordHash,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map