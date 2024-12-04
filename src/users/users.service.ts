import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database.service';
import { ResultSetHeader } from 'mysql2';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(private readonly dbService: DatabaseService) { }

  async getAllUsers() {
    const connection = this.dbService.getConnection();
    const [rows] = await connection.query('SELECT * FROM User');
    return rows;
  }

  async findOne(id: number){
    const connection = this.dbService.getConnection();
    const [rows] = await connection.query('SELECT * FROM User WHERE id = ?', [id]);
    if(!rows[0]) { throw new HttpException(`User ${id} not found `, HttpStatus.NOT_FOUND) }
    return rows[0];
  }

  async createUser(user: CreateUserDto) {
    const connection = this.dbService.getConnection();
    const [result] = await connection.query<ResultSetHeader>('INSERT INTO User SET?', user);
    console.log([result])
    return { id: result.insertId, ...user };
  }


  async updateUser(id: number, user: UpdateUserDto,) {
    const connection = this.dbService.getConnection();
    const [rows] = await connection.query('UPDATE User SET? WHERE id =?', [user, id]);
    return [user, rows];
  }


  async removeUser(id: number) {
    const connection = this.dbService.getConnection();
    const [rows] = await connection.query('DELETE FROM User WHERE id =?', id);
    if(!rows[0]) { throw new HttpException(`User ${id} not found `, HttpStatus.NOT_FOUND) }
    return rows[0];
  }
}
