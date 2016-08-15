class List < ApplicationRecord
  has_many :user_lists
  has_many :users, through: :user_lists
  has_many :tasks

  def update_permission(user,permission)
    user_lists.where(user_id: user.id).first.update(permission: permission)
  end

  def permission(user)
    user_lists.where(user_id: user.id).first.permission
  end
end
