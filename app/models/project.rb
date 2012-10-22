class Project < ActiveRecord::Base
  attr_accessible :description, :name, :slug, :open

  validates :name, :presence => true
  validates :slug, :presence => true


end
