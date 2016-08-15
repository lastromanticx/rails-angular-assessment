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

  def collaborators=(emails)
    collaborator_list = emails.gsub(","," ").split(/\s+/).map{|email| User.find_by(email: email)}.compact
    creator = user_lists.where(permission: "creator").first.user 
    collaborator_list << creator
    self.users.clear
    collaborator_list.uniq.each do |u| 
      self.users << u
      update_permission(u, "collaborator")
    end
    update_permission(creator, "creator")
    save
  end
end
