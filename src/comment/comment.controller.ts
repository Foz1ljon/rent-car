import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Headers,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { Comment } from './entities/comment.entity';
import { JwtAuthGuard } from '../common/guards/UserGuard';

@ApiTags('Comments') // Grouping under 'Comments' in Swagger
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({
    status: 201,
    description: 'Comment successfully created',
    type: Comment,
  })
  @ApiResponse({
    status: 404,
    description: 'User or car not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Token not provided or invalid',
  })
  @ApiBearerAuth() // Adds a bearer token in Swagger documentation
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Headers('Authorization') token: string,
  ) {
    return this.commentService.create(createCommentDto, token);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments with pagination' })
  @ApiResponse({
    status: 200,
    description: 'All comments retrieved successfully',
    type: [Comment],
  })
  @ApiResponse({
    status: 404,
    description: 'Comments not found',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'The page number for pagination',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'The number of comments per page',
    type: Number,
    example: 10,
  })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.commentService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific comment by ID' })
  @ApiResponse({
    status: 200,
    description: 'Comment retrieved successfully',
    type: Comment,
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found',
  })
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a comment' })
  @ApiResponse({
    status: 200,
    description: 'Comment successfully updated',
    type: Comment,
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Token not provided or invalid',
  })
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Headers('Authorization') token: string,
  ) {
    return this.commentService.update(+id, updateCommentDto, token);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({
    status: 200,
    description: 'Comment successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Token not provided or invalid',
  })
  @ApiBearerAuth()
  remove(@Param('id') id: string, @Headers('Authorization') token: string) {
    return this.commentService.remove(+id, token);
  }
}
