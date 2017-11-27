# == Schema Information
#
# Table name: datasets
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  file_name  :string           not null
#  rows       :jsonb            not null
#  header     :jsonb            not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class DatasetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
