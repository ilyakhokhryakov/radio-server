require 'taglib'

class TrackUploader < CarrierWave::Uploader::Base

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  process :extract_metadata

  def extract_metadata
    TagLib::FileRef.open(file.path) do |ref|
      tag = ref.tag
      model.album = tag.album
      model.artist = tag.artist
      model.genre = tag.genre
      model.title = tag.title
    end
  end

  def extension_white_list
    %w(mp3 ogg)
  end

  def filename
    "#{upload_token}.#{file.extension}"
  end

  protected
  
  def upload_token
    model.upload_token ||= Digest::MD5.hexdigest(Time.now.to_i.to_s)
  end

end
