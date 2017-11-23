class Api::UsersController < ApplicationController
    def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: { session: @user.errors.full_messages }, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
