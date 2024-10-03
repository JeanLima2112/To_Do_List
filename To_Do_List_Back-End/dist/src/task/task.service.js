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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const task_dto_1 = require("./task.dto");
const task_entity_1 = require("./task.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let TaskService = class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async create(task) {
        const taskToSave = {
            user_id: task.user_id,
            title: task.title,
            description: task.description,
            expirationDate: task.expirationDate,
            status: task_dto_1.TaskStatusEnum.TO_DO,
        };
        const createdTask = await this.taskRepository.save(taskToSave);
        return this.mapEntityToDto(createdTask);
    }
    async findById(id) {
        const foundTask = await this.taskRepository.findOne({ where: { id } });
        if (!foundTask) {
            throw new common_1.HttpException(`Task with id ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        return this.mapEntityToDto(foundTask);
    }
    async findAll(params) {
        const searchPrams = {};
        if (params.user_id) {
            searchPrams.user_id = (0, typeorm_1.Like)(`%${params.user_id}%`);
        }
        const tasksFound = await this.taskRepository.find({
            where: searchPrams,
        });
        return tasksFound.map((taskEntity) => this.mapEntityToDto(taskEntity));
    }
    async update(id, task) {
        const foundTask = await this.taskRepository.findOne({ where: { id } });
        if (!foundTask) {
            throw new common_1.HttpException(`Task with id '${id}' not found`, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.taskRepository.update(id, this.mapDtoToEntity(task));
    }
    async remove(id) {
        const result = await this.taskRepository.delete(id);
        if (!result.affected) {
            throw new common_1.HttpException(`Task with id '${id}' not found`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    mapEntityToDto(taskEntity) {
        return {
            id: taskEntity.id,
            user_id: taskEntity.user_id,
            title: taskEntity.title,
            description: taskEntity.description,
            expirationDate: taskEntity.expirationDate,
            status: task_dto_1.TaskStatusEnum[taskEntity.status],
        };
    }
    mapDtoToEntity(taskDto) {
        return {
            title: taskDto.title,
            user_id: taskDto.user_id,
            description: taskDto.description,
            expirationDate: taskDto.expirationDate,
            status: taskDto.status.toString(),
        };
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(task_entity_1.TaskEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TaskService);
//# sourceMappingURL=task.service.js.map