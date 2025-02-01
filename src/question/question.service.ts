import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import { Model } from 'mongoose';
import { IQuestion } from './interfaces/question.interface';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';

@Injectable()
export class QuestionService {
     constructor( @InjectModel(Question.name) private readonly questionModel:Model<Question>){}
    
    
        async create(Question:CreateQuestionDto):Promise<IQuestion>{
            try{
    
                const createdQuestion = new this.questionModel(Question);
                return await createdQuestion.save();
            }catch(e){
                throw new InternalServerErrorException("Try Again Later")
            }
        }
    
      
    
        async findOneById(id:string):Promise<Question>{
            return await this.questionModel.findById(id).exec();
        }
    
        async update(id:string,updatedQuestion:UpdateQuestionDto):Promise<IQuestion>{
    
           try{ const question = await this.findOneById(id);
            if(!question){
                throw new NotFoundException('Question not found');
            }
    
            return await this.questionModel.findByIdAndUpdate(id,updatedQuestion,{new:true}).exec();}
            catch(e){
                throw new InternalServerErrorException("Try Again Later")
            }
    
        }
        async delete(id:string):Promise<string>{
            try{
                const question = await this.findOneById(id);
                if(!question){
                    throw new NotFoundException('Question not found');
                }
                await this.questionModel.findByIdAndDelete(id).exec();
                return 'Question deleted successfully';
            }catch(e){
                throw new InternalServerErrorException("Try Again Later")
            }
      
        }

        async createBulk(createQuestionsDto: CreateQuestionDto[]): Promise<string[]> {
            try{

                const createdQuestions = await this.questionModel.insertMany(createQuestionsDto);
                console.log({createdQuestions})
                return createdQuestions.map(q => q._id.toString());
            }catch(e){
                throw new InternalServerErrorException("Try Again Later");
            }
          }

          async deleteBulk(questionIds: string[]): Promise<string> {
            try{
                const deletedQuestions = await this.questionModel.deleteMany({ _id: { $in: questionIds } });
                return deletedQuestions.deletedCount.toString();
            }catch(e){
                throw new InternalServerErrorException("Try Again Later");
            }
          }
}
