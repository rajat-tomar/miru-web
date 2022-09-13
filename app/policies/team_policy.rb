# frozen_string_literal: true

class TeamPolicy < ApplicationPolicy
  attr_reader :error_message_key

  def index?
    return true if user_owner_role? || user_admin_role? || user_employee_role?

    @error_message_key = :unauthorized_access
    false
  end

  def edit?
    user_owner_role? || user_admin_role?
  end

  def update?
    user_owner_role? || user_admin_role?
  end

  def destroy?
    user_owner_role? || user_admin_role?
  end

  def permitted_attributes
    [:first_name, :last_name, :email]
  end
end
