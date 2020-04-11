require 'test_helper'

class PaintingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @painting = paintings(:one)
  end

  test "should get index" do
    get paintings_url, as: :json
    assert_response :success
  end

  test "should create painting" do
    assert_difference('Painting.count') do
      post paintings_url, params: { painting: { caption: @painting.caption, price: @painting.price, size: @painting.size, style: @painting.style, title: @painting.title } }, as: :json
    end

    assert_response 201
  end

  test "should show painting" do
    get painting_url(@painting), as: :json
    assert_response :success
  end

  test "should update painting" do
    patch painting_url(@painting), params: { painting: { caption: @painting.caption, price: @painting.price, size: @painting.size, style: @painting.style, title: @painting.title } }, as: :json
    assert_response 200
  end

  test "should destroy painting" do
    assert_difference('Painting.count', -1) do
      delete painting_url(@painting), as: :json
    end

    assert_response 204
  end
end
